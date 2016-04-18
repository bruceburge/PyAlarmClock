import json
import datetime


def SaveAlarmsToJson(data, key):
    # get existing alarms
    jsonData = ReturnAlarmsInJson()
    # either over right data for that key, or add it to the json
    jsonData[key] = data
    # save the results back to the json file.
    with open('alarms.json', 'w') as fp:
         json.dump(jsonData, fp)


def ReturnAlarmsInJson():
    with open('alarms.json', 'r') as fp:
        return json.load(fp)

#data = {}
#data = {'isActive': 1, 'days': [0, 1, 1, 1, 1, 1, 0]}
#key = str(datetime.datetime.now().hour * 60 + datetime.datetime.now().minute)
#SaveAlarmsToJson(data, key)
