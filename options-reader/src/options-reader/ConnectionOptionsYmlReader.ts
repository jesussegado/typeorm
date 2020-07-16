import * as fs from "fs";
import { ConnectionOptions } from "typeorm-core";
import { safeLoad } from "js-yaml";
/**
 * Reads connection options defined in the yml file.
 */
export class ConnectionOptionsYmlReader {
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Reads connection options from given yml file.
     */
    read(path: string): ConnectionOptions[] {
        const config = safeLoad(fs.readFileSync(path).toString()) as any;
        return Object.keys(config).map((connectionName) => {
            return {
                name: connectionName,
                ...config[connectionName],
            };
        });
    }
}
