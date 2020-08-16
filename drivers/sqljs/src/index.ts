import { Connection, getConnectionManager } from "typeorm-core";
import { SqljsEntityManager } from "./SqljsEntityManager";

export * from "./SqljsDriver";
export * from "./SqljsQueryRunner";
export * from "./SqljsEntityManager";

// TODO: Breaking change - remove sqljsManager from Connection
/**
 * Gets Sqljs entity manager from connection name.
 * "default" connection is used, when no name is specified.
 * Only works when Sqljs driver is used.
 */
export function getSqljsManager(
    connectionNameOrConnection: string | Connection = "default"
): SqljsEntityManager {
    let connection;
    if (typeof connectionNameOrConnection === "string") {
        connection = getConnectionManager().get(connectionNameOrConnection);
    } else {
        connection = connectionNameOrConnection;
    }
    return (connection.manager as unknown) as SqljsEntityManager;
}
