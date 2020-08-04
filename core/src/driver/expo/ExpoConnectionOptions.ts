import { TypeORMOptions } from "../../connection/TypeORMOptions";

/**
 * Sqlite-specific connection options.
 */
export interface ExpoConnectionOptions extends TypeORMOptions {
    /**
     * Database type.
     */
    readonly type: "expo";

    /**
     * Database name.
     */
    readonly database: string;

    /**
     * Driver module
     */
    readonly driver: any;
}
