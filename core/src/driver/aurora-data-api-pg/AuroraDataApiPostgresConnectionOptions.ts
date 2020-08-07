import { TypeORMOptions } from "../../connection/TypeORMOptions";

/**
 * Postgres-specific connection options.
 */
export interface AuroraDataApiPostgresConnectionOptions extends TypeORMOptions {
    /**
     * Database type.
     */
    readonly type: "aurora-data-api-pg";

    readonly region: string;

    readonly secretArn: string;

    readonly resourceArn: string;

    readonly database: string;

    /**
     * The Postgres extension to use to generate UUID columns. Defaults to uuid-ossp.
     * If pgcrypto is selected, TypeORM will use the gen_random_uuid() function from this extension.
     * If uuid-ossp is selected, TypeORM will use the uuid_generate_v4() function from this extension.
     */
    readonly uuidExtension?: "pgcrypto" | "uuid-ossp";

    /*
     * Function handling errors thrown by drivers pool.
     * Defaults to logging error with `warn` level.
     */
    readonly poolErrorHandler?: (err: any) => any;

    readonly serviceConfigOptions?: { [key: string]: any };
}
