$(function(){


    $.getJSON('../alarmlist')
       .done(function (data)
       {
            $.each(data, function() {

            var button = ('<td><button type="button" id="id'+this.timeInMinutes+'" class="btnRemove btn btn-default btn-sm"><span class="glyphicon glyphicon-remove-sign"></span></button></td>');
            var data =    (
                    '<td>'+moment(0,"HH").minute(this.timeInMinutes).format("HH:mm")
                    + '</td><td>'
                    + makeDaysString(this.days) +
                    '</td><td>'
                    + ((this.isActive > 0)? 'True' : 'False') +
                    '</td>'
                );

                $('#AlarmList > tbody').append("<tr>"+button+""+data+"</tr>");

            });

       }).fail(function()
       {
          //console.log( "error" );
       }).always(function()
        {
          //console.log( "complete" );
        })

        $(document).on('click', '.btnRemove', function()
        {
            if(confirm("Do you want to delete"))
            {
                alert("good bye: "+this.id)
            }
        });
});




function makeDaysString(dayarry)
{
  var days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
  var result = "";
  for(i=0;i<dayarry.length;i++)
  {
    if(dayarry[i] > 0)
     {
       result = result +" "+ days[i];
     }
  }

  return result;
}