package io.github.mosser.arduinoml.kernel.structural;

import io.github.mosser.arduinoml.kernel.behavioral.Condition;

public class Expression {

    private Condition condition;

    private LogicalOperand operand;

    public Expression(Condition condition) {
        this.condition = condition;
    }
}
