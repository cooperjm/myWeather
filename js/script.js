var weather = 'https://fcc-weather-api.glitch.me/api/current?';
var tempUnit = 'f';
var f = "<span style='color: blue'>&#176F</span>";
var c = "<span style='color: blue'>&#176C</span>";
var minMaxF = "&#176F";
var minMaxC = "&#176C";

$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(function(p) {
    var lat = 'lat=' + p.coords.latitude;
    var lon = 'lon=' + p.coords.longitude;

    getWeatherCondition(lat, lon);
    $('#temperature').addClass('animated tada');
    //console.log(lat, lon);
  });

  $('#temperature').on('click', function() {
    if(tempUnit == 'f') {
      tempUnit = 'c';

      $('.currentTempNumber').html((data.main.temp).toFixed(1) + c);
      $('.minTemp').html('Min: ' + (data.main.temp_min).toFixed(1) + minMaxC);
      $('.maxTemp').html('Min: ' + (data.main.temp_max).toFixed(1) + minMaxC);
    }
    else {
      tempUnit = 'f';

      $('.currentTempNumber').html(tempToFahrenheit(data.main.temp) + f);
      $('.minTemp').html('Min: ' + tempToFahrenheit(data.main.temp_min) + minMaxF);
      $('.maxTemp').html('Min: ' + tempToFahrenheit(data.main.temp_max) + minMaxF);
    }
  });

});

//Plugs in lat and lon to API, retrieves and fills in data to the page


function getWeatherCondition(lat, lon) {
  $.getJSON(weather + lat + '&' + lon, function(weatherData){

    var doN = nightOrday(weatherData.sys.sunset, weatherData.sys.sunrise);
    colorNightOrDay();
    data = weatherData;
    initialTemp = weatherData.main.temp;
    tempMax = weatherData.main.temp_max;
    tempMin = weatherData.main.temp_min;

    var weatherCode = weatherData.weather[0].id;
    classIcon = 'wi wi-owm-' + doN + '-' + weatherCode;
    $('#weatherIcon').addClass(classIcon);
    $('.sunrise').html(formatTime(weatherData.sys.sunrise));
    $('.sunset').html(formatTime(weatherData.sys.sunset));
    $('.name').html(weatherData.name);
    $('.conditionName').html(weatherData.weather[0].description);
    $('.currentTempNumber').html(tempToFahrenheit(weatherData.main.temp) + f);
    $('.minTemp').html('Min: ' + tempToFahrenheit(weatherData.main.temp_min) + minMaxF);
    $('.maxTemp').html('Max: ' + tempToFahrenheit(weatherData.main.temp_max) + minMaxF);
    $('.humidity').html(weatherData.main.humidity + '%');
    $('.windspeed').html(weatherData.wind.speed + ' mph');
    $('.currentTempText').html('Current Temperature');
    $('#temperature').css('cursor','pointer');

  });
}

//Formats timestamp to standard time
function formatTime(time) {
  var hour = new Date(time * 1000).getHours();
  var min = new Date(time * 1000).getMinutes();

  if (min < 10) {
    min = '0' + min;
  }

  if (hour == 0){
    hour = 12;
  }

  if (hour > 12) {
    time = (hour - 12) + ':' + min + 'pm';
  }
  else {
    time = hour + ':' + min + 'am';
  }
  return time;
}

//Convert celsius to fahrenheit
function tempToFahrenheit(temp) {
  var temp = (temp * 1.8 + 32).toFixed(1);
  return temp;
}


// Grabs current time and checks if its hour is between
// the sunrise and sunset hour.  I know it's not precise,
// but it doesnt have to be.
function nightOrday(sunset, sunrise) {
  var time = new Date().getHours();
  var ss = new Date(sunset * 1000).getHours();
  var sr = new Date(sunrise * 1000).getHours();
  dayOrNight = '';

  if (time > sr && time < ss) {
    dayOrNight = 'day';
  } else {
    dayOrNight = 'night';
  }
  return dayOrNight;
}
//Change color of icon background depending if it is night or day
function colorNightOrDay() {
  if (dayOrNight == 'day') {
    $('#weatherIcon').css('background-color', '#72C8D7');
  }
  else {
    $('#weatherIcon').css('background-color', '#3A434B');
  }
}
