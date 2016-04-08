from blinkstick import blinkstick
import OpenWeatherMap
import LedColorGradient

led = blinkstick.find_first()

tempInt = OpenWeatherMap.temperatureint()

# if the temperature falls outside the range of the gradient, return black color
if tempInt > len(LedColorGradient.colors) or tempInt < 0:
    val = '000000'
else:
    val = LedColorGradient.colors[tempInt]

print(tempInt, " ", val)


def slow_illumination(duration=1000, steps=50):
    # method for slow illumination of strip
    for x in range(0, led.get_led_count()):
        led.morph(channel=0, index=x, hex="#" + val, duration=duration, steps=steps)


def turnoff():
    for x in range(0, led.get_led_count()):
        led.set_color(channel=0, index=x, name="black")
