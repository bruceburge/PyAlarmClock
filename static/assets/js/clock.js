$(function(){

    var temp = 0.0;
    var serverNow;
	var clock = $('#clock');
    var day = $('#day');
    var now;

	$.getJSON("../UIdata", function(data) {
       temp = data.temperature;
       serverNow = data.date;
	});


	(function update_time(){

		clock.text(moment().format("HH:mm:ss")).slabText();
		day.text(moment().format("dddd"));
		day.append(" "+temp+"&deg;F");
		//console.debug(now);
		setTimeout(update_time, 1000);	
	})();	
});