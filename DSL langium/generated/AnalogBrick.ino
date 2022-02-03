//Wiring code generated from an ArduinoML model
// Application name: AnalogBrick

enum State {low, middle, high};
State currentState = low;
const int button = 1;
const int led = 12;
const int buzzer = 11;


void setup() {
    pinMode(button, INPUT);
    pinMode(led, OUTPUT);
    pinMode(buzzer, OUTPUT);
    Serial.begin(9600);
}

void loop() {
    switch(currentState) {
        
        case low:
            digitalWrite(led, LOW);
digitalWrite(buzzer, LOW);
            
            if (analogRead(button) >= 512) {
                currentState = middle;
            }
            break;
            
        case middle:
            digitalWrite(led, HIGH);
digitalWrite(buzzer, HIGH);
            
            if (analogRead(button) < 512) {
                currentState = low;
            }

            if (analogRead(button) >= 800) {
                currentState = high;
            }
            break;
            
        case high:
            digitalWrite(led, HIGH);
digitalWrite(buzzer, LOW);
            
            if (analogRead(button) < 800) {
                currentState = middle;
            }
            break;
            
    }
}
