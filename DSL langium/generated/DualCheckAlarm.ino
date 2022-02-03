
		//Wiring code generated from an ArduinoML model
		// Application name: DualCheckAlarm
		long debounce = 200;
		enum STATE {a, b};
		STATE currentState = a;
		const int button1 = 9;const int button2 = 10;const int led = 12;const int buzzer = 11;

		void setup(){
            pinMode(button1, INPUT);
pinMode(button2, INPUT);
pinMode(led, OUTPUT);
pinMode(buzzer, OUTPUT);
            Serial.begin(9600);
		}

		void loop() {
			switch(currentState){
                
            case a:
                    digitalWrite(led, LOW);digitalWrite(buzzer, LOW);
                    if (digitalRead(button1) == HIGH && digitalRead(button2) == HIGH) {
            currentState = b;
        };
                    break;
            
            case b:
                    digitalWrite(led, HIGH);digitalWrite(buzzer, HIGH);
                    if (digitalRead(button1) == LOW || digitalRead(button2) == LOW) {
            currentState = a;
        };
                    break;
            
			}
		}
        