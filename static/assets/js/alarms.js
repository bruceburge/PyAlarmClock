$(function(){
$.getJSON('../alarmlist')
   .done(function (data)
   {
       data;
    $.each(result.GroupList, function() {
    $('#AlarmList > tbody').append(
        '<tr><td>'
        + this.userName
        + '</td><td>'
        + this.count +
        '</td></tr>'
    );
});

   }).fail(function()
   {
      //console.log( "error" );
   }).always(function()
    {
      //console.log( "complete" );
    })
});