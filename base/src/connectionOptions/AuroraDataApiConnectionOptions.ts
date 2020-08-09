import { AuroraDataApiConnectionCredentialsOptions } from "./AuroraDataApiConnectionCredentialsOptions";

/**
 * MySQL specific connection options.
 *
 * @see https://github.com/mysqljs/mysql#connection-options
 */
export interface AuroraDataApiConnectionOptions
    extends AuroraDataApiConnectionCredentialsOptions {
    /**
     * Database type.
     */
    readonly type: "aurora-data-api";

    readonly region: string;

    readonly secretArn: string;

    readonly resourceArn: string;

    readonly database: string;

    readonly serviceConfigOptions?: { [key: string]: any }; // pass optional AWS.ConfigurationOptions here

    /**
     * Use spatial functions like GeomFromText and AsText which are removed in MySQL 8.
     * (Default: true)
     */
    readonly legacySpatialSupport?: boolean;

    /**
     * Extra connection options to be passed to the underlying driver.
     *
     * todo: deprecate this and move all database-specific types into hts own connection options object.
     */
    readonly extra?: any;
}
