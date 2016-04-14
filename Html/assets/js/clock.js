$(function(){
	
	(function update_time(){
		var clock = $('#clock');
		var now = moment().format("HH:mm:ss");	
		clock.text(now);
		setTimeout(update_time, 1000);	
	})();	
});