import { CockroachConnectionCredentialsOptions } from "./CockroachConnectionCredentialsOptions";

/**
 * Cockroachdb-specific connection options.
 */
export interface CockroachConnectionOptions
    extends CockroachConnectionCredentialsOptions {
    /**
     * Database type.
     */
    readonly type: "cockroachdb";

    /**
     * Schema name.
     */
    readonly schema?: string;

    /**
     * Replication setup.
     */
    readonly replication?: {
        /**
         * Master server used by orm to perform writes.
         */
        readonly master: CockroachConnectionCredentialsOptions;

        /**
         * List of read-from severs (slaves).
         */
        readonly slaves: CockroachConnectionCredentialsOptions[];
    };

    /*
     * Function handling errors thrown by drivers pool.
     * Defaults to logging error with `warn` level.
     */
    readonly poolErrorHandler?: (err: any) => any;

    /**
     * Extra connection options to be passed to the underlying driver.
     *
     * todo: deprecate this and move all database-specific types into hts own connection options object.
     */
    readonly extra?: any;
}
