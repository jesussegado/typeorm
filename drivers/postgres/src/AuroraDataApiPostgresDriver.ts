import { Connection } from "typeorm-core";
import { AuroraDataApiPostgresConnectionOptions } from "typeorm-base";
import { AuroraDataApiPostgresQueryRunner } from "./AuroraDataApiPostgresQueryRunner";
import { PostgresWrapper } from "./PostgresWrapper";

/**
 * Organizes communication with PostgreSQL DBMS.
 */
export class AuroraDataApiPostgresDriver extends PostgresWrapper {
    /**
     * Connection used by driver.
     */
    connection: Connection;

    /**
     * Aurora Data API underlying library.
     */
    DataApiDriver: any;

    client: any;

    /**
     * Connection options.
     */
    options: AuroraDataApiPostgresConnectionOptions;

    /**
     * Master database used to perform all write queries.
     */
    database?: string;

    constructor(
        connection: Connection,
        connectionOptions: AuroraDataApiPostgresConnectionOptions
    ) {
        super();
        this.connection = connection;
        this.options = connectionOptions;
        this.isReplicated = false;

        // load data-api package
        this.loadDependencies();

        this.client = new this.DataApiDriver(
            this.options.region,
            this.options.secretArn,
            this.options.resourceArn,
            this.options.database,
            (query: string, parameters?: any[]) =>
                this.connection.logger.logQuery(query, parameters),
            this.options.serviceConfigOptions
        );
    }

    /**
     * Performs connection to the database.
     * Based on pooling options, it can either create connection immediately,
     * either create a pool and create connection when needed.
     */
    async connect(): Promise<void> {}

    /**
     * Closes connection with database.
     */
    async disconnect(): Promise<void> {}

    /**
     * Creates a query runner used to execute database queries.
     */
    createQueryRunner(mode: "master" | "slave" = "master") {
        return new AuroraDataApiPostgresQueryRunner(this, mode);
    }

    /**
     * If driver dependency is not given explicitly, then try to load it via "require".
     */
    protected loadDependencies(): void {
        const { pg } = require("typeorm-aurora-data-api-driver");

        this.DataApiDriver = pg;
    }

    /**
     * Executes given query.
     */
    protected executeQuery(connection: any, query: string) {
        return this.client.query(query);
    }
}
