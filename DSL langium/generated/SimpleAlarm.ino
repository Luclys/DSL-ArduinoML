
		//Wiring code generated from an ArduinoML model
		// Application name: SimpleAlarm
		long debounce = 200;
		enum STATE {a, b};
		STATE currentState = a;
		const int button = 9;const int led = 12;const int buzzer = 10;

		void setup(){
            pinMode(button, INPUT);
pinMode(led, OUTPUT);
pinMode(buzzer, OUTPUT);
            Serial.begin(9600);
		}

		void loop() {
			switch(currentState){
                
            case a:
                    digitalWrite(led, LOW);digitalWrite(buzzer, LOW);
                    if (digitalRead(button) == HIGH) {
            currentState = b;
        };
                    break;
            
            case b:
                    digitalWrite(led, HIGH);digitalWrite(buzzer, HIGH);
                    if (digitalRead(button) == LOW) {
            currentState = a;
        };
                    break;
            
			}
		}
        