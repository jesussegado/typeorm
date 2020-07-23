import * as path from "path";
import chalk from "chalk";
import { highlight, Theme } from "cli-highlight";

/**
 * Platform-specific tools.
 */
export class PlatformTools {
    /**
     * Type of the currently running platform.
     */
    static type: "browser" | "node" = process?.versions?.node
        ? "node"
        : "browser";

    /**
     * Gets global variable where global stuff can be stored.
     */
    static getGlobalVariable(): any {
        if (typeof window !== "undefined") {
            // eslint-disable-next-line no-undef
            return window;
        }
        return global;
    }

    /**
     * Loads ("require"-s) given file or package.
     * This operation only supports on node platform
     */
    static load(name: string): any {
        // if name is not absolute or relative, then try to load package from the node_modules of the directory we are currently in
        // this is useful when we are using typeorm package globally installed and it accesses drivers
        // that are not installed globally

        try {
            // TODO: check if that works with webpack
            // switch case to explicit require statements for webpack compatibility.
            return require(name);
        } catch (err) {
            if (
                !path.isAbsolute(name) &&
                name.substr(0, 2) !== "./" &&
                name.substr(0, 3) !== "../"
            ) {
                return require(path.resolve(
                    `${process.cwd()}/node_modules/${name}`
                ));
            }

            throw err;
        }
    }

    /**
     * Highlights sql string to be print in the console.
     */
    static highlightSql(sql: string) {
        const theme: Theme = {
            keyword: chalk.blueBright,
            literal: chalk.blueBright,
            string: chalk.white,
            type: chalk.magentaBright,
            // eslint-disable-next-line @typescript-eslint/camelcase
            built_in: chalk.magentaBright,
            comment: chalk.gray,
        };
        return highlight(sql, { theme, language: "sql" });
    }
}
