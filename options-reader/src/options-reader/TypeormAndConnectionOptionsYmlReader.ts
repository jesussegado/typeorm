import * as fs from "fs";
import { TypeormAndConnectionOptions } from "typeorm-core";
import { safeLoad } from "js-yaml";
/**
 * Reads connection options defined in the yml file.
 */
export class TypeormAndConnectionOptionsYmlReader {
    /**
     * Reads connection options from given yml file.
     */
    read(path: string): TypeormAndConnectionOptions[] {
        const config = safeLoad(fs.readFileSync(path).toString()) as any;
        return Object.keys(config).map((connectionName) => {
            return {
                typeORMOptions: {
                    name: connectionName,
                },
                ...config[connectionName],
            };
        });
    }
}
