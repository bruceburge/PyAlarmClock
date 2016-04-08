import Flask as Flask
import OpenWeatherMap

app = Flask(__name__)
app.secret_key = '$%bYwkupan1pJFja5ATcNH!!!!!'

@app.route('/')
def index():
    return

@app.route('/temp')
def temp():
    return OpenWeatherMap.temperatureint()


