import colors from 'colors';
import { Command } from 'commander';
import { languageMetaData } from '../language-server/generated/module';
import { App } from '../language-server/generated/ast';
import { createEasyLanguageArduinoServices } from '../language-server/easy-language-arduino-module';
import { extractAstNode } from './cli-util';
import { generateIno } from './generator';

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const app = await extractAstNode<App>(fileName, languageMetaData.fileExtensions, createEasyLanguageArduinoServices());
    const generatedFilePath = generateIno(app, fileName, opts.destination);
    console.log(colors.green(`Ino code generated successfully: ${generatedFilePath}`));
};

export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);

    program
        .command('generate')
        .argument('<file>', `possible file extensions: ${languageMetaData.fileExtensions.join(', ')}`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('Generates converted Ino code.')
        .action(generateAction);

    program.parse(process.argv);
}
