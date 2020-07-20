import { ConnectionOptions } from "typeorm-core";
import { OrmUtils } from "typeorm-base";
import { getEnvVariable } from "..";

/**
 * Reads connection options from environment variables.
 * Environment variables can have only a single connection.
 * Its strongly required to define TYPEORM_CONNECTION env variable.
 */
export class ConnectionOptionsEnvReader {
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Reads connection options from environment variables.
     */
    read(): ConnectionOptions {
        return {
            type:
                getEnvVariable("TYPEORM_CONNECTION") ||
                (getEnvVariable("TYPEORM_URL")
                    ? getEnvVariable("TYPEORM_URL").split("://")[0]
                    : undefined),
            url: getEnvVariable("TYPEORM_URL"),
            host: getEnvVariable("TYPEORM_HOST"),
            port: getEnvVariable("TYPEORM_PORT"),
            username: getEnvVariable("TYPEORM_USERNAME"),
            password: getEnvVariable("TYPEORM_PASSWORD"),
            database: getEnvVariable("TYPEORM_DATABASE"),
            sid: getEnvVariable("TYPEORM_SID"),
            schema: getEnvVariable("TYPEORM_SCHEMA"),
            extra: getEnvVariable("TYPEORM_DRIVER_EXTRA")
                ? JSON.parse(getEnvVariable("TYPEORM_DRIVER_EXTRA"))
                : undefined,
            synchronize: OrmUtils.toBoolean(
                getEnvVariable("TYPEORM_SYNCHRONIZE")
            ),
            dropSchema: OrmUtils.toBoolean(
                getEnvVariable("TYPEORM_DROP_SCHEMA")
            ),
            migrationsRun: OrmUtils.toBoolean(
                getEnvVariable("TYPEORM_MIGRATIONS_RUN")
            ),
            entities: this.stringToArray(getEnvVariable("TYPEORM_ENTITIES")),
            migrations: this.stringToArray(
                getEnvVariable("TYPEORM_MIGRATIONS")
            ),
            migrationsTableName: getEnvVariable(
                "TYPEORM_MIGRATIONS_TABLE_NAME"
            ),
            subscribers: this.stringToArray(
                getEnvVariable("TYPEORM_SUBSCRIBERS")
            ),
            logging: this.transformLogging(getEnvVariable("TYPEORM_LOGGING")),
            logger: getEnvVariable("TYPEORM_LOGGER"),
            entityPrefix: getEnvVariable("TYPEORM_ENTITY_PREFIX"),
            maxQueryExecutionTime: getEnvVariable(
                "TYPEORM_MAX_QUERY_EXECUTION_TIME"
            ),
            debug: getEnvVariable("TYPEORM_DEBUG"),
            cli: {
                entitiesDir: getEnvVariable("TYPEORM_ENTITIES_DIR"),
                migrationsDir: getEnvVariable("TYPEORM_MIGRATIONS_DIR"),
                subscribersDir: getEnvVariable("TYPEORM_SUBSCRIBERS_DIR"),
            },
            cache: this.transformCaching(),
            uuidExtension: getEnvVariable("TYPEORM_UUID_EXTENSION"),
        };
    }

    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------

    /**
     * Transforms logging string into real logging value connection requires.
     */
    protected transformLogging(logging: string): any {
        if (logging === "true" || logging === "TRUE" || logging === "1")
            return true;
        if (logging === "all") return "all";

        return this.stringToArray(logging);
    }

    /**
     * Transforms caching option into real caching value option requires.
     */
    protected transformCaching(): boolean | object | undefined {
        const caching = getEnvVariable("TYPEORM_CACHE");
        if (caching === "true" || caching === "TRUE" || caching === "1")
            return true;
        if (caching === "false" || caching === "FALSE" || caching === "0")
            return false;
        if (caching === "redis" || caching === "database")
            return {
                type: caching,
                options: getEnvVariable("TYPEORM_CACHE_OPTIONS")
                    ? JSON.parse(getEnvVariable("TYPEORM_CACHE_OPTIONS"))
                    : undefined,
                alwaysEnabled: getEnvVariable("TYPEORM_CACHE_ALWAYS_ENABLED"),
                duration: parseInt(getEnvVariable("TYPEORM_CACHE_DURATION")),
            };

        return undefined;
    }

    /**
     * Converts a string which contains multiple elements split by comma into a string array of strings.
     */
    protected stringToArray(variable?: string) {
        if (!variable) return [];
        return variable.split(",").map((str) => str.trim());
    }
}
