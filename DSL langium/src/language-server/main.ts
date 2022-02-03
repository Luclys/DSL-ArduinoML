import { startLanguageServer } from 'langium';
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node';
import { createEasyLanguageArduinoServices } from './easy-language-arduino-module';

// Create a connection to the client
const connection = createConnection(ProposedFeatures.all);

// Inject the language services
const services = createEasyLanguageArduinoServices({ connection });

// Start the language server with the language-specific services
startLanguageServer(services);
