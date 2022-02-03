package main.groovy.groovuinoml.script

sensor "button" pin 9
actuator "led" pin 12
actuator "buzzer" pin 11

state "on" means "led" becomes "high" and "buzzer" becomes "high"
state "off" means "led" becomes "low" and "buzzer" becomes "low"

initial "off"

from "off" to "on" when "button" becomes "high"
from "on" to "off" when "button" becomes "low"

export "Scenario 1"