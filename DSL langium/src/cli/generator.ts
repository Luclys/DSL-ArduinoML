import fs from 'fs';
import { CompositeGeneratorNode, processGeneratorNode } from 'langium';
import { App } from '../language-server/generated/ast';
import { extractDestinationAndName } from './cli-util';
import path from 'path';
import { ElaGenerator } from './ElaGenerator';

export function generateIno(app: App, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination, app.name);
    const generatedFilePath = `${path.join(data.destination, data.name)}.ino`;

    const fileNode = new CompositeGeneratorNode();
    const elaGenerator = new ElaGenerator();

    fileNode.append(elaGenerator.compile(app));

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, processGeneratorNode(fileNode));
    return generatedFilePath;
}
