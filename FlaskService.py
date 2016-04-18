from flask import Flask
import flask
import OpenWeatherMap
import AlarmStorage

app = Flask(__name__)
app.secret_key = '$%bYwkupan1pJFja5ATcNH!!!!!'


@app.route('/')
def index():
    # print flask.url_for('static', filename='Index.html')

    return flask.redirect(flask.url_for('static', filename='Index.html'))

@app.route('/climate')
def climate():
    return flask.jsonify(OpenWeatherMap.climateConditions())

@app.route('/alarmlist')
def alarmlist():
    return flask.jsonify(AlarmStorage.ReturnAlarmsInJson())

@app.route('/saveAlarms')
def saveAlarms():
    return

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int("80"), debug=True)
