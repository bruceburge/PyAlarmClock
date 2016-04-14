from flask import Flask
import flask
import OpenWeatherMap
import datetime

app = Flask(__name__)
app.secret_key = '$%bYwkupan1pJFja5ATcNH!!!!!'


@app.route('/')
def index():
    # print flask.url_for('static', filename='timeTest.html')

    return flask.redirect(flask.url_for('static', filename='timeTest.html'))

@app.route('/UIdata')
def uidata():

    return flask.jsonify(temperature=OpenWeatherMap.temperature(), date=str(datetime.datetime.now()))


@app.route('/temperature')
def temp():
    # return temperature in whatever format the rest request to openweather was made in
    return flask.jsonify(temperature=OpenWeatherMap.temperature())


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int("80"), debug=True)
