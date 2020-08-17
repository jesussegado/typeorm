import { AbstractSqliteQueryRunner } from "typeorm-core/build/compiled/src/driver/sqlite-abstract/AbstractSqliteQueryRunner";
import { Broadcaster } from "typeorm-core/build/compiled/src/subscriber/Broadcaster";
import { QueryFailedError } from "typeorm-core";
import { QueryRunnerAlreadyReleasedError } from "typeorm-core/build/compiled/src/error/QueryRunnerAlreadyReleasedError";
import { TransactionAlreadyStartedError } from "typeorm-core/build/compiled/src/error/TransactionAlreadyStartedError";
import { TransactionNotStartedError } from "typeorm-core/build/compiled/src/error/TransactionNotStartedError";
import { ExpoDriver } from "./ExpoDriver";

// Needed to satisfy the Typescript compiler
interface ResultSet {
    insertId: number | undefined;
    rowsAffected: number;
    rows: {
        length: number;
        item: (idx: number) => any;
        _array: any[];
    };
}
interface Transaction {
    executeSql: (
        sql: string,
        args: any[] | undefined,
        ok: (tsx: Transaction, resultSet: ResultSet) => void,
        fail: (tsx: Transaction, err: any) => void
    ) => void;
}

/**
 * Runs queries on a single sqlite database connection.
 */
export class ExpoQueryRunner extends AbstractSqliteQueryRunner {
    /**
     * Database driver used by connection.
     */
    driver: ExpoDriver;

    /**
     * Database transaction object
     */
    private transaction?: Transaction;

    constructor(driver: ExpoDriver) {
        super();
        this.driver = driver;
        this.connection = driver.connection;
        this.broadcaster = new Broadcaster(this);
    }

    /**
     * Starts transaction. Within Expo, all database operations happen in a
     * transaction context, so issuing a `BEGIN TRANSACTION` command is
     * redundant and will result in the following error:
     *
     * `Error: Error code 1: cannot start a transaction within a transaction`
     *
     * Instead, we keep track of a `Transaction` object in `this.transaction`
     * and continue using the same object until we wish to commit the
     * transaction.
     */
    async startTransaction(): Promise<void> {
        if (this.isTransactionActive && typeof this.transaction !== "undefined")
            throw new TransactionAlreadyStartedError();

        this.isTransactionActive = true;
    }

    /**
     * Commits transaction.
     * Error will be thrown if transaction was not started.
     * Since Expo will automatically commit the transaction once all the
     * callbacks of the transaction object have been completed, "committing" a
     * transaction in this driver's context means that we delete the transaction
     * object and set the stage for the next transaction.
     */
    async commitTransaction(): Promise<void> {
        if (
            !this.isTransactionActive &&
            typeof this.transaction === "undefined"
        )
            throw new TransactionNotStartedError();

        this.isTransactionActive = false;
        this.transaction = undefined;
    }

    /**
     * Rollbacks transaction.
     * Error will be thrown if transaction was not started.
     * This method's functionality is identical to `commitTransaction()` because
     * the transaction lifecycle is handled within the Expo transaction object.
     * Issuing separate statements for `COMMIT` or `ROLLBACK` aren't necessary.
     */
    async rollbackTransaction(): Promise<void> {
        if (
            !this.isTransactionActive &&
            typeof this.transaction === "undefined"
        )
            throw new TransactionNotStartedError();

        this.isTransactionActive = false;
        this.transaction = undefined;
    }

    /**
     * Executes a given SQL query.
     */
    async query(query: string, parameters?: any[]): Promise<any> {
        if (this.isReleased) throw new QueryRunnerAlreadyReleasedError();

        const databaseConnection = await this.connect();
        return new Promise<any>((ok, fail) => {
            this.driver.connection.logger.logQuery(query, parameters, this);
            const queryStartTime = +new Date();
            // All Expo SQL queries are executed in a transaction context
            databaseConnection.transaction(
                async (transaction: Transaction) => {
                    if (typeof this.transaction === "undefined") {
                        await this.startTransaction();
                        this.transaction = transaction;
                    }
                    this.transaction.executeSql(
                        query,
                        parameters,
                        (t: Transaction, result: ResultSet) => {
                            // log slow queries if maxQueryExecution time is set
                            const {
                                maxQueryExecutionTime,
                            } = this.driver.connection.options;
                            const queryEndTime = +new Date();
                            const queryExecutionTime =
                                queryEndTime - queryStartTime;
                            if (
                                maxQueryExecutionTime &&
                                queryExecutionTime > maxQueryExecutionTime
                            ) {
                                this.driver.connection.logger.logQuerySlow(
                                    queryExecutionTime,
                                    query,
                                    parameters,
                                    this
                                );
                            }

                            // return id of inserted row, if query was insert statement.
                            if (query.substr(0, 11) === "INSERT INTO") {
                                ok(result.insertId);
                            } else {
                                const resultSet = [];
                                for (let i = 0; i < result.rows.length; i++) {
                                    resultSet.push(result.rows.item(i));
                                }
                                ok(resultSet);
                            }
                        },
                        (t: Transaction, err: any) => {
                            this.driver.connection.logger.logQueryError(
                                err,
                                query,
                                parameters,
                                this
                            );
                            fail(new QueryFailedError(query, parameters, err));
                        }
                    );
                },
                async (err: any) => {
                    await this.rollbackTransaction();
                },
                () => {
                    this.isTransactionActive = false;
                    this.transaction = undefined;
                }
            );
        });
    }
}
