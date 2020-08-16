import * as fs from "fs";
import * as dotenv from "dotenv";
import { TypeormAndConnectionOptions } from "typeorm-core";
import * as appRootPath from "app-root-path";
import { TypeormAndConnectionOptionsEnvReader } from "./options-reader/TypeormAndConnectionOptionsEnvReader";
import { TypeormAndConnectionOptionsYmlReader } from "./options-reader/TypeormAndConnectionOptionsYmlReader";
import { TypeormAndConnectionOptionsXmlReader } from "./options-reader/TypeormAndConnectionOptionsXmlReader";
/**
 * Reads connection options from the ormconfig.
 * Can read from multiple file extensions including env, json, js, xml and yml.
 */

export function getEnvVariable(name: string): any {
    return process.env[name];
}
export function fileExist(pathStr: string): boolean {
    return fs.existsSync(pathStr);
}
export async function getTypeormAndConnectionOptions(
    connectionName: string = "default"
): Promise<TypeormAndConnectionOptions> {
    return new TypeormAndConnectionOptionsReader().get(connectionName);
}

export class TypeormAndConnectionOptionsReader {
    constructor(
        protected options?: {
            /**
             * Directory where ormconfig should be read from.
             * By default its your application root (where your app package.json is located).
             */
            root?: string;

            /**
             * Filename of the ormconfig configuration. By default its equal to "ormconfig".
             */
            configName?: string;
        }
    ) {}

    /**
     * Returns all connection options read from the ormconfig.
     */
    async all(): Promise<TypeormAndConnectionOptions[]> {
        const options = await this.load();
        if (!options)
            throw new Error(
                `No connection options were found in any orm configuration files.`
            );

        return options;
    }

    /**
     * Gets a connection with a given name read from ormconfig.
     * If connection with such name would not be found then it throw error.
     */
    async get(name: string): Promise<TypeormAndConnectionOptions> {
        const allOptions = await this.all();
        const targetOptions = allOptions.find(
            (options) =>
                options.typeORMOptions.name === name ||
                (name === "default" && !options.typeORMOptions.name)
        );
        if (!targetOptions)
            throw new Error(
                `Cannot find connection ${name} because its not defined in any orm configuration files.`
            );

        return targetOptions;
    }

    /**
     * Checks if there is a TypeORM configuration file.
     */
    async has(name: string): Promise<boolean> {
        const allOptions = await this.load();
        if (!allOptions) return false;

        const targetOptions = allOptions.find(
            (options) =>
                options.typeORMOptions.name === name ||
                (name === "default" && !options.typeORMOptions.name)
        );
        return !!targetOptions;
    }

    /**
     * Loads all connection options from a configuration file.
     *
     * todo: get in count NODE_ENV somehow
     */
    protected async load(): Promise<TypeormAndConnectionOptions[] | undefined> {
        let TypeormAndConnectionOptions:
            | TypeormAndConnectionOptions
            | TypeormAndConnectionOptions[]
            | undefined;

        const fileFormats = [
            "env",
            "js",
            "cjs",
            "ts",
            "json",
            "yml",
            "yaml",
            "xml",
        ];

        // Detect if baseFilePath contains file extension
        const possibleExtension = this.baseFilePath.substr(
            this.baseFilePath.lastIndexOf(".")
        );
        const fileExtension = fileFormats.find(
            (extension) => `.${extension}` === possibleExtension
        );

        // try to find any of following configuration formats
        const foundFileFormat =
            fileExtension ||
            fileFormats.find((format) => {
                return fs.existsSync(`${this.baseFilePath}.${format}`);
            });

        // if .env file found then load all its variables into process.env using dotenv package
        if (foundFileFormat === "env") {
            dotenv.config({ path: this.baseFilePath });
        } else if (fileExist(".env")) {
            dotenv.config({ path: ".env" });
        }

        // Determine config file name
        const configFile = fileExtension
            ? this.baseFilePath
            : `${this.baseFilePath}.${foundFileFormat}`;

        // try to find connection options from any of available sources of configuration
        if (
            getEnvVariable("TYPEORM_CONNECTION") ||
            getEnvVariable("TYPEORM_URL")
        ) {
            TypeormAndConnectionOptions = new TypeormAndConnectionOptionsEnvReader().read();
        } else if (foundFileFormat === "js" || foundFileFormat === "cjs") {
            TypeormAndConnectionOptions = await require(configFile);
        } else if (foundFileFormat === "ts") {
            TypeormAndConnectionOptions = await require(configFile);
        } else if (foundFileFormat === "json") {
            TypeormAndConnectionOptions = require(configFile);
        } else if (foundFileFormat === "yml") {
            TypeormAndConnectionOptions = new TypeormAndConnectionOptionsYmlReader().read(
                configFile
            );
        } else if (foundFileFormat === "yaml") {
            TypeormAndConnectionOptions = new TypeormAndConnectionOptionsYmlReader().read(
                configFile
            );
        } else if (foundFileFormat === "xml") {
            TypeormAndConnectionOptions = await new TypeormAndConnectionOptionsXmlReader().read(
                configFile
            );
        }

        // normalize and return connection options
        if (TypeormAndConnectionOptions) {
            return this.normalizeTypeormAndConnectionOptions(
                TypeormAndConnectionOptions
            );
        }

        return undefined;
    }

    /**
     * Normalize connection options.
     */
    protected normalizeTypeormAndConnectionOptions(
        TypeormAndConnectionOptions:
            | TypeormAndConnectionOptions
            | TypeormAndConnectionOptions[]
    ): TypeormAndConnectionOptions[] {
        if (!Array.isArray(TypeormAndConnectionOptions))
            TypeormAndConnectionOptions = [TypeormAndConnectionOptions];

        TypeormAndConnectionOptions.forEach((options) => {
            if (options.typeORMOptions?.entities) {
                const entities = (options.typeORMOptions.entities as any[]).map(
                    (entity) => {
                        if (
                            typeof entity === "string" &&
                            entity.substr(0, 1) !== "/"
                        )
                            return `${this.baseDirectory}/${entity}`;

                        return entity;
                    }
                );
                Object.assign(TypeormAndConnectionOptions, { entities });
            }
            if (options.typeORMOptions?.subscribers) {
                const subscribers = (options.typeORMOptions
                    .subscribers as any[]).map((subscriber) => {
                    if (
                        typeof subscriber === "string" &&
                        subscriber.substr(0, 1) !== "/"
                    )
                        return `${this.baseDirectory}/${subscriber}`;

                    return subscriber;
                });
                Object.assign(TypeormAndConnectionOptions, { subscribers });
            }
            if (options.typeORMOptions?.migrations) {
                const migrations = (options.typeORMOptions
                    .migrations as any[]).map((migration) => {
                    if (
                        typeof migration === "string" &&
                        migration.substr(0, 1) !== "/"
                    )
                        return `${this.baseDirectory}/${migration}`;

                    return migration;
                });
                Object.assign(TypeormAndConnectionOptions, { migrations });
            }

            // make database path file in sqlite relative to package.json
            if (options.connectionOptions?.type === "sqlite") {
                if (
                    typeof options.connectionOptions.database === "string" &&
                    options.connectionOptions.database.substr(0, 1) !== "/" && // unix absolute
                    options.connectionOptions.database.substr(1, 2) !== ":\\" && // windows absolute
                    options.connectionOptions.database !== ":memory:"
                ) {
                    Object.assign(options.connectionOptions, {
                        database: `${this.baseDirectory}/${options.connectionOptions.database}`,
                    });
                }
            }
        });

        return TypeormAndConnectionOptions;
    }

    /**
     * Gets directory where configuration file should be located and configuration file name.
     */
    protected get baseFilePath(): string {
        return `${this.baseDirectory}/${this.baseConfigName}`;
    }

    /**
     * Gets directory where configuration file should be located.
     */
    protected get baseDirectory(): string {
        if (this.options && this.options.root) return this.options.root;

        return appRootPath.path;
    }

    /**
     * Gets configuration file name.
     */
    protected get baseConfigName(): string {
        if (this.options && this.options.configName)
            return this.options.configName;

        return "ormconfig";
    }
}
