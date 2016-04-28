$(function(){
    var alarmListData;

    $.getJSON('../alarmlist')
       .done(function (data)
       {
            alarmListData = data;

            $.each(data, function() {

            var deleteButton = ('<td><button title="Remove" type="button" id="removeid|'+this.timeInMinutes+'" class="btnRemove btn btn-default btn-sm"><span class="glyphicon glyphicon-remove-sign"></span></button></td>');
            var ModifyButton = ('<td><button title="Modify" type="button" id="editid|'+this.timeInMinutes+'" class="btnEdit btn btn-default btn-sm"><span class="glyphicon glyphicon-wrench"></span></button></td>');
            var data =    (
                    '<td>'+moment(0,"HH").minute(this.timeInMinutes).format("HH:mm")
                    + '</td><td>'
                    + makeDaysString(this.days) +
                    '</td><td>'
                    + ((this.isActive > 0)? 'True' : 'False') +
                    '</td>'
                );

                $('#AlarmList > tbody').append("<tr>"+deleteButton+ModifyButton+data+"</tr>");

            });

       }).fail(function()
       {
          //console.log( "error" );
       })

//Modify Alarm Button
        $(document).on('click', '.btnEdit', function()
        {
                var tmpId = this.id.split('|')[1];
                //console.log(alarmListData[tmpId]);
                populateForm(alarmListData[tmpId]);
                $('#demo').collapse("show");

        });


//Remove Alarm Button
        $(document).on('click', '.btnRemove', function()
        {
            if(confirm("Do you want to delete"))
            {
                var tmpId = this.id.split('|')[1];
                $.ajax({
                url: "../deletealarmbyid/"+tmpId
                }).done(function (data)
                {
                  console.log(data);
                  //alert("good bye: "+tmpId)

                   $(document).ajaxStop(function()
                   {
                        location.reload(true);
                   });
                });


            }
        });


        $(document).on('click', '.btnSaveAlarm', function()
        {
            $("#alarmForm").submit();
        }
        );

        $( "form" ).submit(function( event ) {
          var x = $( this ).serializeArray();
          buildStorageJson(x);
          event.preventDefault();
        });

});



function populateForm(json)
{

    ($('input:radio[name=AlarmStatus]')[json.isActive]).checked = true;
    var hour = 0;
    var minute = 0;
    hour = parseInt(json.timeInMinutes/60);
    minute = parseInt(json.timeInMinutes)%60;
    $('select[name=minute]').val(minute);
    $('select[name=hour]').val(hour);

    for(i=0;i<json.days.length;i++)
    {

        if(json.days[i] == 1)
         {
            ($('input:checkbox[name="days"]')[i]).checked = true;
         }
         else
         {
            ($('input:checkbox[name="days"]')[i]).checked = false;
         }
    }

}

//converts form data to json for server use
function buildStorageJson(serializeArray)
{
  //{"568": {"timeInMinutes": "568", "days": [0, 1, 1, 1, 1, 1, 0], "isActive": 1}

//json object structure stub
var tmp = {};
  tmp[1] = {
  "timeInMinutes": 0,
  "isActive": 0,
  "days": [0,0,0,0,0,0,0]
};

   $.each(serializeArray, function(i, field)
    {
      if(field.name == "AlarmStatus") { tmp[1].isActive = field.value}
      else if(field.name == "hour") {tmp[1].timeInMinutes += parseInt(field.value * 60)} //convert hours to minutes
      else if(field.name == "minute") {tmp[1].timeInMinutes += parseInt(field.value)}
      else if(field.name == "days") {tmp[1].days[field.value] = 1} //form will only submit days checked, their value is their index
    });


tmp[tmp[1].timeInMinutes] = tmp[1]; //once time in minutes is known, move data to that object
delete tmp[1]; // remove template

//pass to server. 
console.log(tmp);
console.log(JSON.stringify(tmp));

}


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