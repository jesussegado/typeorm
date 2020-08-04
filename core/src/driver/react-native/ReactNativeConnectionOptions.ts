import { TypeORMOptions } from "../../connection/TypeORMOptions";

/**
 * Sqlite-specific connection options.
 */
export interface ReactNativeConnectionOptions extends TypeORMOptions {
    /**
     * Database type.
     */
    readonly type: "react-native";

    /**
     * Database name.
     */
    readonly database: string;

    /**
     * Storage Location
     */
    readonly location: string;
}
