from flask import Flask
import OpenWeatherMap
import LedController

app = Flask(__name__)
app.secret_key = '$%bYwkupan1pJFja5ATcNH!!!!!'

@app.route('/')
def index():
    return ''

@app.route('/temperature')
def temp():
    # return temperature in whatever format the rest request to openweather was made in
    return str(OpenWeatherMap.temperature())

@app.route('/turnoffleds')
def turnoff():
    # call logic to turn off blink stick
    LedController.turnoff()
    return 'true'

@app.route('/slow_weather_based_illumination')
def slow_weather_based_illumination():
    LedController.slow_illumination()
    return 'true'

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int("80"), debug=True)
