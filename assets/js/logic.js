const mykey = config.MY_KEY;
const url = 'https://api.openweathermap.org/data/2.5/forecast?q='


$(document).ready(function () {
  $(".btn").click(function (event) {
    event.preventDefault();
    var cityName = $("#search").val()
    $("#search").val("")
    // getWeather(cityName)
    console.log(cityName)
    fetch(url + cityName + '&appid=' + mykey + "&units=imperial",)
      .then(function (response) {
        return response.json();
      })
  });
});
