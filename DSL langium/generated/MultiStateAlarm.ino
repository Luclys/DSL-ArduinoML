//Wiring code generated from an ArduinoML model
// Application name: MultiStateAlarm

enum State {stall, buzzOn, buzzOff_ledOn};
State currentState = stall;
const int button = 9;
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
        
        case stall:
            digitalWrite(led, LOW);
digitalWrite(buzzer, LOW);
            
            if (digitalRead(button) == HIGH) {
                currentState = buzzOn;
            }
            break;
            
        case buzzOn:
            digitalWrite(buzzer, HIGH);
            
            if (digitalRead(button) == HIGH) {
                currentState = buzzOff_ledOn;
            }
            break;
            
        case buzzOff_ledOn:
            digitalWrite(buzzer, LOW);
digitalWrite(led, HIGH);
            
            if (digitalRead(button) == HIGH) {
                currentState = stall;
            }
            break;
            
    }
}
