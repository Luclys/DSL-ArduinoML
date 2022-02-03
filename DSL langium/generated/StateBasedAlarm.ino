//Wiring code generated from an ArduinoML model
// Application name: StateBasedAlarm

enum State {a, b};
State currentState = a;
const int button = 9;
const int led = 12;


void setup() {
    pinMode(button, INPUT);
    pinMode(led, OUTPUT);
    Serial.begin(9600);
}

void loop() {
    switch(currentState) {
        
        case a:
            digitalWrite(led, LOW);
            
            if (digitalRead(button) == HIGH) {
                currentState = b;
            }
            break;
            
        case b:
            digitalWrite(led, HIGH);
            
            if (digitalRead(button) == HIGH) {
                currentState = a;
            }
            break;
            
    }
}
