const mykey = 'e41cae56b33edbfc24408b3b37caf9e3';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const todayUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const iconUrl = "https://api.openweathermap.org/data/2.5/img/w/"
var cities = [];
var historyCities = cities

// Pull city list and make buttons from local storage
var cityList = JSON.parse(localStorage.getItem("historyCities"));
if (cityList === null) {
  console.log("Element is undefined");
} else
  cityList.forEach(function (item) {
    $('#city-history').append(`
  <button class="btn-2 mt-2 btn-outline-secondary btn-block">${item}</button>
  `)
  });

// create city lisy as buttons
function createBtns() {
  $('#city-history').empty();
  cities.forEach(function (item) {
    $('#city-history').append(`
    <button class="btn-2 mt-2 btn-outline-secondary btn-block">${item}</button>
    `)
  });
}



// click search event listener
$(document).ready(function () {
  $(".btn").click(function (event) {
    event.preventDefault();
    var cityName = $("#search").val()
    $("#search").val("")
    if ((cityName).length === 0) {
      alert("Please enter City!")
      return;
    } else
      getWeather(cityName)
    console.log(cityName)
    getForecast(cityName);
    cities.push(cityName)
    createBtns();
    $("#five-cards").removeClass('hide')
    $("h2").removeClass('hide')
    saveHistory();
  });
});


// click city history buttons event listener
$(".btn-2").on("click", function (event) {
  event.preventDefault();
  getWeather($(this).text());
  getForecast($(this).text());
  $("#five-cards").removeClass('hide')
  $("h2").removeClass('hide')
})

// save search to local storage
function saveHistory() {
  historyCities.push
  localStorage.setItem("historyCities", JSON.stringify(historyCities));
  console.log(historyCities);
}


// Fetch todays weather function
function getWeather(searchvalue) {
  fetch(todayUrl + searchvalue + '&appid=' + mykey + "&units=imperial",)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data)
      $(".city").text(searchvalue + " " + moment().format("l"))
      $(".temp").text("Temperature: " + data.main.temp + "° F")
      $(".humidity").text("Humidity: " + data.main.humidity + "%")
      $(".wind").text("Wind Speed: " + data.wind.speed + " mph")
      getUvi(data.coord.lat, data.coord.lon);
    }).catch(function () {
      console.log("error");
      alert("Please enter a valid City!")
    })
}

// Fetch UV index function
function getUvi(lat, long) {
  fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${mykey}`,)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data)
      $(".uv-color").text("" + data.value);
      if (data.value > 7.99) {
        $(".uv-color").addClass("bg-danger")
      } else if (data.value < 7.98 && data.value > 6) {
        $(".uv-color").addClass("bg-warning")
      } else {
        $(".uv-color").addClass("bg-success")
      }
    });
}


// fetch 5days forecast function
function getForecast(searchvalue) {
  fetch(forecastUrl + searchvalue + '&appid=' + mykey + "&units=imperial",)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data)
      // for  loop to get 5 days info
      for (var i = 1; i < 6; i++) {
        var castTemp = data.list[i].main.temp
        var castHum = data.list[i].main.humidity
        var weatherImg = data.list[i].weather[0].icon
        $(".today-img").attr("src", `https://openweathermap.org/img/wn/${weatherImg}@2x.png`)
        $(".day" + i).text(moment().add(i, "day").format("l"))
        $('#dayimg-' + i).attr("src", `https://openweathermap.org/img/wn/${weatherImg}@2x.png`)
        $('#daytemp-' + i).text(`Temperature: ${castTemp}° F`)
        $('#dayhum-' + i).text(`Humidity: ${castHum}%`)
      }
    })
}