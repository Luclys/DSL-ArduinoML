import { NL } from "langium";
import { Action, AnalogCondition, App, Brick, Condition, Conditions, DigitalCondition, isActuator, isAnalogCondition, isDigitalCondition, isSensor, Operator, State, Transition, Value } from "../language-server/generated/ast";

export class ElaGenerator {

    compile(app: App): string {
        return `//Wiring code generated from an ArduinoML model
// Application name: ${app.name}

enum State {${app.States.map(state => state.name).join(', ')}};
${app.initial != null ? `State currentState = ${app.initial};` : ''}
${app.Bricks.map(brick => this.declareBrick(brick)).join('')}

void setup() {
${app.Bricks.map(brick => this.generateBrick(brick)).join(NL.lineDelimiter)}
    Serial.begin(9600);
}

void loop() {
    switch(currentState) {
        ${app.States.map(state => this.generateState(state)).join('')}
    }
}
`
    }

    declareBrick(brick: Brick): string {
        return `const int ${brick.name} = ${brick.pin};${NL.lineDelimiter}`
    }

    generateBrick(brick: Brick): string {
        let io;
        if (isSensor(brick)) {
            io = "INPUT";
        } else if (isActuator(brick)) {
            io = "OUTPUT";
        }

        return `    pinMode(${brick.name}, ${io});`
    }

    generateState(state: State): string {
        return `
        case ${state.name}:
            ${state.Actions !== null
                ? state.Actions.map(action => this.generateAction(action)).join(`;${NL.lineDelimiter}`)
                : ''};
            ${state.Transitions !== null
                ? state.Transitions.map(transition => this.generateTransition(transition)).join(NL.lineDelimiter)
                : ''}
            break;
            `;
    }

    generateAction(action: Action): string {
        return `digitalWrite(${action.name}, ${this.generateValue(action.value)})`;
    }

    generateTransition(transition: Transition): string {
        return `
            if (${this.generateConditions(transition.conditions)}) {
                currentState = ${transition.goto};
            }`;
    }

    generateConditions(conditions: Conditions): string {
        return `${this.generateCondition(conditions.leftCondition)}${conditions.operator == null
                ? ""
                : ` ${this.generateOperator(conditions.operator)} ${this.generateConditions(conditions.rightConditions)}`
            }`;
    }

    generateCondition(condition: Condition): string {
        if (isAnalogCondition(condition)) {
            return this.generateAnalogCondition(condition);
        } else if (isDigitalCondition(condition)) {
            return this.generateDigitalCondition(condition);
        } else {
            return '';
        }
    }

    generateAnalogCondition(condition: AnalogCondition): string {
        return `analogRead(${condition.sensor}) ${condition.analogOp} ${condition.value}`;
    }

    generateDigitalCondition(condition: DigitalCondition): string {
        return `digitalRead(${condition.sensor}) == ${this.generateValue(condition.value)}`;
    }

    generateOperator(operator: Operator): string {
        switch (operator) {
            case 'AND':
                return '&&';
            case 'OR':
                return '||';
        }
    }

    generateValue(value: Value): string {
        switch (value) {
            case 'ON':
                return 'HIGH';
            case 'OFF':
                return 'LOW';
        }
    }
}