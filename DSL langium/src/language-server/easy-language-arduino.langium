grammar EasyLanguageArduino
hidden(WS, SL_COMMENT, ML_COMMENT)

App:
    'Application' name=ID 'initial' 'state' initial=ID '{'
        'Bricks' ':'
        Bricks+=Brick (Bricks+=Brick)*
        'States' ':'
        States+=State (States+=State)*
    '}';

Brick:
    '-' (Sensor | Actuator);

Sensor:
    'Input' name=ID '=' 'PIN('pin=INT')';

Actuator:
    'Output' name=ID '=' 'PIN('pin=INT')';

State:
    name=ID ':' '{'
        'actions' ':'
		(Actions+=Action)+
        'transitions' ':'
		(Transitions+=Transition)+
    '}';

Action:
    '-' name=ID value=Value;

Transition:
    '-' 'if' '(' conditions=Conditions ')' 'goto' 'state' goto=ID;

Conditions:
    leftCondition=Condition (operator=Operator rightConditions=Conditions)?;

Condition:
    (AnalogCondition|DigitalCondition);

DigitalCondition:
    sensor=ID 'is' value=Value;

AnalogCondition:
    sensor=ID analogOp=AnalogOperator value=INT;

Value returns string: 'ON' | 'OFF';
Operator returns string: 'OR' | 'AND';
AnalogOperator returns string: '<' | '<=' | '==' | '!=' | '>=' | '>';

terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;

terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
terminal SL_COMMENT: /\/\/[^\n\r]*/;
