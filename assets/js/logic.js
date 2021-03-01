const mykey = 'e41cae56b33edbfc24408b3b37caf9e3';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const todayUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const iconUrl = "https://api.openweathermap.org/data/2.5/img/w/"
const cities = [];

// //Getting local storage if any
// if (localStorage.getItem("cities") !== null) {
//   cities = JSON.parse(localStorage.getItem("cities"));
//   for (var i = 0; i < cities.length; i++) {
//     var cityListadd = $("<div>").addClass("city");
//     cityListadd.text(cities[i]);
//     $("#city-history").append(cityListadd);
//   }
// }

function createBtns() {
  $('#city-history').empty();
  cities.forEach(function (item) {
    $('#city-history').append(`
    <button class="mt-2 btn-outline-secondary btn-block">${item}</button>
    `)
    // $(".btn-2").click((getForecast))
    populateHistory();
  });
}




$(document).ready(function () {
  $(".btn").click(function (event) {
    event.preventDefault();
    // $('.hide').show();
    var cityName = $("#search").val()
    $("#search").val("")
    getWeather(cityName)
    console.log(cityName)
    getForecast(cityName);
    cities.push(cityName)
    createBtns();
  });
});
// today
function getWeather(searchvalue) {
  fetch(todayUrl + searchvalue + '&appid=' + mykey + "&units=imperial",)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data)
      cities.push(searchvalue)
      $(".city").text(searchvalue + " " + moment().format("l"))
      $(".temp").text("Temperature: " + data.main.temp + "° F")
      $(".humidity").text("Humidity: " + data.main.humidity + "%")
      $(".wind").text("Wind Speed: " + data.wind.speed + " mph")
      getUvi(data.coord.lat, data.coord.lon);

    })
}

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

populateHistory = (city) => {
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
}


// 5days
function getForecast(searchvalue) {
  fetch(forecastUrl + searchvalue + '&appid=' + mykey + "&units=imperial",)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data)

      for (var i = 0; i < data.list.length; i += 8) {
        var castTemp = data.list[i].main.temp
        var castHum = data.list[i].main.humidity
        var weatherImg = data.list[i].weather[0].icon
        $(".today-img").attr("src", `https://openweathermap.org/img/wn/${weatherImg}@2x.png`)
        $(".day1").text(moment().add(1, "day").format("l"))
        $(".day2").text(moment().add(2, "days").format("l"))
        $(".day3").text(moment().add(3, "days").format("l"))
        $(".day4").text(moment().add(4, "days").format("l"))
        $(".day5").text(moment().add(5, "days").format("l"))
        $('#dayimg-' + [i]).attr("src", `https://openweathermap.org/img/wn/${weatherImg}@2x.png`)
        $('#daytemp-' + [i]).text(`Temperature: ${castTemp}° F`)
        $('#dayhum-' + [i]).text(`Humidity: ${castHum}%`)
      }
    })
}