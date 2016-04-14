import math
import requests
import APPID


# APPID.py.appId put in ignored file to not leak key.
payload = {'APPID': APPID.appId, 'id': '4315588', 'units': 'imperial'}
r = requests.get('http://api.openweathermap.org/data/2.5/weather', params=payload)
data = r.json()

temp = data['main']['temp']
tempInt = int(math.ceil(temp))


def temperature():
    return temp


def temperatureint():
    return tempInt
