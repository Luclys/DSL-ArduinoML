import { ValidationAcceptor, ValidationCheck, ValidationRegistry } from 'langium';
import { EasyLanguageArduinoAstType, App } from './generated/ast';
import { EasyLanguageArduinoServices } from './easy-language-arduino-module';

/**
 * Map AST node types to validation checks.
 */
type EasyLanguageArduinoChecks = { [type in EasyLanguageArduinoAstType]?: ValidationCheck | ValidationCheck[] }

/**
 * Registry for validation checks.
 */
export class EasyLanguageArduinoValidationRegistry extends ValidationRegistry {
    constructor(services: EasyLanguageArduinoServices) {
        super(services);
        const validator = services.validation.EasyLanguageArduinoValidator;
        const checks: EasyLanguageArduinoChecks = {
            App: validator.checkStartsWithCapital
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class EasyLanguageArduinoValidator {
    //TODO add checks
    checkStartsWithCapital(app: App, accept: ValidationAcceptor): void {
        if (app.name) {
            const firstChar = app.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'App name should start with a capital.', { node: app, property: 'name' });
            }
        }
    }
}
