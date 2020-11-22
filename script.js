$(document).ready(function () {
    const myKey = '3378373f3ab215405fc8140860945152'
$('#searchBtn').click(function () {
  let userInput = $('#city').val();
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=${myKey}`;
  //AJAX CALL FOR CURRENT WEATHER
  $.ajax({
    url: queryURL,
    type: 'GET',
  }).then(function (response) {
    console.log(response);
    response.name;
    response.main.temp;
    response.main.humidity;
    response.wind.speed;
    $('#cityName').text(
      response.name + ' (' + new Date().toLocaleDateString() + ')'
    );
    $('#cityName').append(
      `<img src="http://openweathermap.org/img/wn/${response.weather[0].icon}.png">`
    );
    $('#currentTemp')
      .text(`Temperature: ${response.main.temp}` + 'º F')
      .addClass('currentWeather');
    $('#humidity')
      .text(`Humidity: ${response.main.humidity}` + '%')
      .addClass('currentWeather');
    $('#windSpeed')
      .text(`Windspeed: ${response.wind.speed}` + 'mph')
      .addClass('currentWeather');
    getForcast(userInput);
  });
});

