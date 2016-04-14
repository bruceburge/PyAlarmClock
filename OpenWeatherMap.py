import math
import requests


# APPID.py.appId put in ignored file to not leak key.
payload = {'APPID': '1a01e2fa6eafa8ff4d3444c8cd4e91a6', 'id': '4315588', 'units': 'imperial'}
r = requests.get('http://api.openweathermap.org/data/2.5/weather', params=payload)
data = r.json()

temp = data['main']['temp']
tempInt = int(math.ceil(temp))


def temperature():
    return data['main']['temp']


def temperatureint():
    return tempInt
