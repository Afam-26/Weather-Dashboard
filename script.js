$(document).ready(function () {

  //AJAX CALL FOR CURRENT WEATHER
$('#searchBtn').click(function () {
  let userInput = $('#city').val();
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=a19feae6aba79b23ca90858cd79bfdb3`;
  
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

 // AJAX CALL FOR FIVE DAY FORECAST
function getForcast(input) {
    let fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=imperial&appid=a19feae6aba79b23ca90858cd79bfdb3`;
   
    $.ajax({
      url: fiveDayQueryURL,
      type: 'GET',
    }).then(function (response) {
      $('#forecast')
        .html('<h4 class="mt-3">5-Day Forecast:</h4>')
        .append('<div class="row">');
      console.log(response);
      for (let i = 0; i < response.list.length; i++) {
        let hour = response.list[i];
        if (hour.dt_txt.indexOf('00:00:00') != -1) {
          let date = new Date(hour.dt_txt).toLocaleDateString();
          hour.main.temp;
          hour.main.humidity;
          let DIV = $('<span>');
          let image = $('<img>');
          image.attr(
            'src',
            `http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`
          );
          DIV.addClass('divClasses');
          DIV.append(`<h3>${date}</h3>`);
          DIV.append(image);
          DIV.append(
            `<p>Temperture <br>  ${
              hour.main.temp + 'º F'
            } </p><p>Humidity <br> ${hour.main.humidity + '%'}</p>`
          );
          $('#fiveDayForecast').append(DIV);
        }
      }
    });
  }
});