import json
import datetime


def SaveAlarmsToJson(data):
    # get existing alarms
    jsonData = ReturnAlarmsInJson()
    # print jsonData
    # either over right data for that key, or add it to the json
    jsonData.update(data)
    # print jsonData
    # save the results back to the json file.
    with open('static/assets/js/alarms.json', 'w') as fp:
        json.dump(jsonData, fp)


def DeleteAlarmByID(id):
    jsonData = ReturnAlarmsInJson()

    if str(id) in jsonData.keys():
        del jsonData[str(id)]
        with open('static/assets/js/alarms.json', 'w') as fp:
            json.dump(jsonData, fp)
            return '1'
    else:
        return '0'


def ReturnAlarmsInJson():
    with open('static/assets/js/alarms.json', 'r') as fp:
        return json.load(fp)

    #  WTF


data = {}
key = str(datetime.datetime.now().hour * 60 + datetime.datetime.now().minute)
data = {key: {'timeInMinutes': key, 'isActive': 1, 'days': [0, 1, 1, 1, 1, 1, 0]}}

# SaveAlarmsToJson(data)
# DeleteAlarmByID(586)
# print ReturnAlarmsInJson()
