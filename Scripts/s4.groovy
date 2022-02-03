sensor "button" pin 9
actuator "led" pin 12
actuator "buzzer" pin 10

state "buzz" means "led" becomes "low" and "buzzer" becomes "high"
state "on" means "led" becomes "high" and "buzzer" becomes "low"
state "off" means "led" becomes "low" and "buzzer" becomes "low"

initial "off"

from "off" to "buzz" when "button" becomes "high"
from "buzz" to "on" when "button" becomes "high"
from "on" to "off" when "button" becomes "high"

export "Scenario 4"