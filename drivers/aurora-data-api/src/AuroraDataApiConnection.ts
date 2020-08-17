import {
    Connection,
    TypeormAndConnectionOptions,
    QueryRunner,
} from "typeorm-core";
import { DriverFactory } from "typeorm-core/build/compiled/src/connection/Connection";
import { AuroraDataApiQueryRunner } from "./AuroraDataApiQueryRunner";
/**
 * Organizes communication with MySQL DBMS.
 */
export class AuroraDataApiConnection extends Connection {
    queryRunnter: AuroraDataApiQueryRunner;

    constructor(
        options: TypeormAndConnectionOptions,
        driverFactory: DriverFactory,
        queryRunner: AuroraDataApiQueryRunner
    ) {
        super(options, driverFactory);
        this.queryRunnter = queryRunner;
    }

    public createQueryRunner(mode: "master" | "slave" = "master"): QueryRunner {
        return this.queryRunnter;
    }
}
