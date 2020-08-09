import { getConnectionManager, ObjectType, Connection } from "typeorm-core";
import { isDriverSupported } from "typeorm-core/build/compiled/src/driver/Driver";
import { MongoEntityManager } from "./MongoEntityManager";
import { MongoRepository } from "./MongoRepository";

export * from "./MongoDriver";
export * from "./MongoEntityManager";
export * from "./MongoMigrationExecutor";
export * from "./MongoQueryRunner";
export * from "./MongoRepository";
export * from "./MongoSchemaBuilder";

/**
 * Gets MongoDB entity manager from the connection.
 * If connection name wasn't specified, then "default" connection will be retrieved.
 */
export function getMongoManager(
    connectionNameOrConnection: string | Connection = "default"
): MongoEntityManager {
    let connection;
    if (typeof connectionNameOrConnection === "string") {
        connection = getConnectionManager().get(connectionNameOrConnection);
    } else {
        connection = connectionNameOrConnection;
    }
    return connection.manager as MongoEntityManager;
}

// TODO: Breaking change - remove getMongoRepo,mongoManager from Connection
/**
 * Gets mongodb repository for the given entity class or name.
 */
export function getMongoRepository<Entity>(
    entityClass: ObjectType<Entity> | string,
    connectionNameOrConnection: string | Connection = "default"
): MongoRepository<Entity> {
    let connection;
    if (typeof connectionNameOrConnection === "string") {
        connection = getConnectionManager().get(connectionNameOrConnection);
    } else {
        connection = connectionNameOrConnection;
    }

    if (!isDriverSupported(["mongodb"], connection.driver.type))
        throw new Error(
            `You can use getMongoRepository only for MongoDB connections.`
        );

    return connection.manager.getRepository(entityClass) as MongoRepository<
        Entity
    >;
}
