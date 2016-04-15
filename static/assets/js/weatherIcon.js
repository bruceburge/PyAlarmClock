

var weatherIcons;

($.getJSON('OpenWeatherToIcons.json')
   .done(function (data) {
       weatherIcons = data;
   });)

function(resp) {
  var prefix = 'wi wi-';
  var code = resp.weather[0].id;
  var icon = weatherIcons[code].icon;

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = 'day-' + icon;
  }

  // Finally tack on the prefix.
  icon = prefix + icon;
}