sensor "button" pin 9
actuator "led" pin 12

state "on" means "led" becomes "high"
state "off" means "led" becomes "low"

initial "off"

from "off" to "on" when "button" becomes "high"
from "on" to "off" when "button" becomes "high"

export "Scenario 3"