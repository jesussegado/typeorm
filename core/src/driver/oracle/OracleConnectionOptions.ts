import { OracleConnectionCredentialsOptions } from "./OracleConnectionCredentialsOptions";

/**
 * Oracle-specific connection options.
 */
export interface OracleConnectionOptions
    extends OracleConnectionCredentialsOptions {
    /**
     * Database type.
     */
    readonly type: "oracle";

    /**
     * Schema name. By default is "public".
     */
    readonly schema?: string;

    /**
     * Replication setup.
     */
    readonly replication?: {
        /**
         * Master server used by orm to perform writes.
         */
        readonly master: OracleConnectionCredentialsOptions;

        /**
         * List of read-from severs (slaves).
         */
        readonly slaves: OracleConnectionCredentialsOptions[];
    };

    /**
     * Extra connection options to be passed to the underlying driver.
     *
     * todo: deprecate this and move all database-specific types into hts own connection options object.
     */
    readonly extra?: any;
}
