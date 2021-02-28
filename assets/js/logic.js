const mykey = 'e41cae56b33edbfc24408b3b37caf9e3';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const todayUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const cities = [];

function createBtns() {
  $('#city-history').empty();
  cities.forEach(function (item) {
    $('#city-history').append(`
   <button class="btn mt-2 btn-primary btn-outline-secondary">${item}</button>
   `)
  })
}

$(document).ready(function () {
  $(".btn").click(function (event) {
    event.preventDefault();
    var cityName = $("#search").val()
    $("#search").val("")
    getWeather(cityName)
    console.log(cityName)
    getForecast(cityName);
    cities.push(cityName)
    createBtns();
  });
});

function getForecast(searchvalue) {
  fetch(forecastUrl + searchvalue + '&appid=' + mykey + "&units=imperial",)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data)
      for (var i = 0; i < data.list.length; i += 8) {

      }
    })
}

function getWeather(searchvalue) {
  fetch(todayUrl + searchvalue + '&appid=' + mykey + "&units=imperial",)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data)
      getUvi(data.coord.lat, data.coord.lon);
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

