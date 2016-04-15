$(function(){

    var temp = 0.0;
    var icon = "01d";
	var clock = $('#clock');
    var day = $('#day');
    var progressbar = $('#dayProgressBar');

    var fetchDataCounter = 0;

    function getUiData(){
        $.getJSON("../climate", function(data) {
          temp =  data.main.temp;
          icon = data.weather[0].icon;
        });
    }


	function update_time(){
        var percent = (Math.round((moment().hours()/24)*100)) + '%'
        progressbar.width(percent);
        progressbar.text(percent);

		clock.text(moment().format("HH:mm:ss")).slabText();
		day.text(moment().format("dddd"));
		day.append(" "+temp+"&deg;F");
		day.append(" <img src='http://openweathermap.org/img/w/"+icon+".png' />");
		//console.debug(now);
		//update conditions in UI every ten seconds
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