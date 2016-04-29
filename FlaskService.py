from flask import Flask, request
import flask
import OpenWeatherMap
import AlarmStorage
import time
import AlarmCheck
# import LedController

app = Flask(__name__)
app.secret_key = '$%bYwkupan1pJFja5ATcNH!!!!!'



@app.route('/')
def index():
    # print flask.url_for('static', filename='Index.html')

    return flask.redirect(flask.url_for('static', filename='Index.html'))


@app.route('/servertime')
def servertime():
       return flask.jsonify(day=time.strftime("%A"), ct=time.strftime("%H:%M:%S"))

@app.route('/climate')
def climate():
    return flask.jsonify(OpenWeatherMap.climateConditions())


@app.route('/alarmlist')
def alarmlist():
    return flask.jsonify(AlarmStorage.ReturnAlarmsInJson())


@app.route('/deletealarmbyid/<id>')
def deleteAlarmById(id=0):
    return AlarmStorage.DeleteAlarmByID(id=id)


@app.route('/saveAlarms', methods=['POST'])
def saveAlarms():
    # {key: {'timeInMinutes': key, 'isActive': 1, 'days': [0, 1, 1, 1, 1, 1, 0]}}
    json = request.json
    # print(json)
    AlarmStorage.SaveAlarmsToJson(json)
    return '1'

@app.route('/turnoffalarm')
def turnoffalarm():
    # LedController.turnoff();
    print("call turn off alarm")
    return '1'


if __name__ == '__main__':
    AlarmCheck.AlarmCheck()
    print("app run")
    app.run(host="0.0.0.0", port=int("80"), debug=True, use_reloader=False)

