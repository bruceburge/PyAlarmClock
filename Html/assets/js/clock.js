$(function(){

	$.getJSON("/temperature", function(data) {

	});


	(function update_time(){
		var clock = $('#clock');
		var day = $('#day');
		var now = moment().format("HH:mm:ss");	
		clock.text(now).slabText();
		day.text(moment().format("dddd"));		
		setTimeout(update_time, 1000);	
	})();	
});