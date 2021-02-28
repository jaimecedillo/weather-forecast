const mykey = 'e41cae56b33edbfc24408b3b37caf9e3';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const todayUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const iconUrl = "https://api.openweathermap.org/data/2.5/img/w/"
var iconContainerEl = document.querySelector('.city-info')
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
    <button class="btn-2 mt-2 btn-outline-secondary btn-block">${item}</button>
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
// 5days
function getForecast(searchvalue) {
  fetch(forecastUrl + searchvalue + '&appid=' + mykey + "&units=imperial",)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data)
      for (var i = 0; i < data.list.length; i += 8) {

        var todImg = data.list[i].weather[0].icon
        $(".today-img").attr("src", `https://openweathermap.org/img/wn/${todImg}@2x.png`)
      }
    })
}
// today
function getWeather(searchvalue) {
  fetch(todayUrl + searchvalue + '&appid=' + mykey + "&units=imperial",)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data)
      getUvi(data.coord.lat, data.coord.lon);
      cities.push(searchvalue)
      $(".city").text(searchvalue + " " + moment().format("l"))

      $(".temp").text("Temperature: " + data.main.temp + "° F")
      $(".humidity").text("Humidity: " + data.main.humidity + "%")
      $(".wind").text("Wind Speed: " + data.wind.speed + " mph")
      // $(".UV").text(getUvi);

    })
}

function getUvi(lat, long) {
  fetch(`http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${mykey}`,)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data)
    });
}

populateHistory = (city) => {
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
}

