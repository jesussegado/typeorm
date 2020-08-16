import {
    Connection,
    TypeormAndConnectionOptions,
    DriverFactory,
} from "./Connection";
import { ConnectionNotFoundError } from "../error/ConnectionNotFoundError";
import { AlreadyHasActiveConnectionError } from "../error/AlreadyHasActiveConnectionError";

/**
 * ConnectionManager is used to store and manage multiple orm connections.
 * It also provides useful factory methods to simplify connection creation.
 */
export class ConnectionManager {
    /**
     * List of connections registered in this connection manager.
     */
    public readonly connections: Connection[] = [];

    /**
     * Checks if connection with the given name exist in the manager.
     */
    has(name: string): boolean {
        return !!this.connections.find(
            (connection) => connection.name === name
        );
    }

    /**
     * Gets registered connection with the given name.
     * If connection name is not given then it will get a default connection.
     * Throws error if connection with the given name was not found.
     */
    get(name: string = "default"): Connection {
        const connection = this.connections.find(
            (connection) => connection.name === name
        );
        if (!connection) throw new ConnectionNotFoundError(name);

        return connection;
    }

    /**
     * Creates a new connection based on the given connection options and registers it in the manager.
     * Connection won't be established, you'll need to manually call connect method to establish connection.
     */
    create(
        options: TypeormAndConnectionOptions,
        driverFactory: DriverFactory
    ): Connection {
        // check if such connection is already registered
        const existConnection = this.connections.find(
            (connection) =>
                connection.name === (options.typeORMOptions.name || "default")
        );
        if (existConnection) {
            // if connection is registered and its not closed then throw an error
            if (existConnection.isConnected)
                throw new AlreadyHasActiveConnectionError(
                    options.typeORMOptions.name || "default"
                );

            // if its registered but closed then simply remove it from the manager
            this.connections.splice(
                this.connections.indexOf(existConnection),
                1
            );
        }

        // create a new connection
        const connection = new Connection(options, driverFactory);
        this.connections.push(connection);
        return connection;
    }
}
