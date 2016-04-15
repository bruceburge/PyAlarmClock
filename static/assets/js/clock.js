/*
$.when(
    $.getScript( "/static/assets/js/weatherIcon.js" ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){
*/

$(function(){

	var clock = $('#clock');
    var day = $('#day');
    var progressbar = $('#dayProgressBar');

    var fetchDataCounter = 0;
    var weatherIcons;
    var temp = 0.0;
    var iconData = {};


($.getJSON('/static/assets/js/OpenWeatherToIcons.json')
   .done(function (data)
   {
       weatherIcons = data;
   }).fail(function()
   {
      //console.log( "error" );
   }).always(function()
    {
      //console.log( "complete" );
    });
   )

    function getWeatherIconAndTitle(resp) {
      var prefix = 'wi wi-';
      var code = resp.id;
      var weatherIconData = {};
      var icon = weatherIcons[code].icon;
      weatherIconData['label'] = weatherIcons[code].label;

      // If we are not in the ranges mentioned above, add a day/night prefix.
      if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
      }

      // Finally tack on the prefix.
      weatherIconData['icon'] = icon = prefix + icon;
      return weatherIconData;
    }

    function getUiData()
    {
        $.getJSON("../climate", function(data)
        {
          temp =  data.main.temp;
          iconData = getWeatherIconAndTitle(data.weather[0]);
        }).fail(function()
        {
           //console.log( "error" );
        }).always(function()
        {
            //console.log( "complete" );
         });
    }

	function update_time(){

		clock.text(moment().format("HH:mm:ss")).slabText();

		day.text(moment().format("dddd"));
		day.append(" "+temp+"&deg;F");
		day.append(" <i class='"+iconData['icon']+"' title='"+iconData['label']+"'></i>");

		//update conditions in UI every 60 seconds
		if(fetchDataCounter >= 60)
		{
		    getUiData();
		    fetchDataCounter = 0;
		}
		else
		{
		    fetchDataCounter++;
		}

		setTimeout(update_time, 1000);
	};

	getUiData();
	update_time();
});