import { AuroraDataApiQueryRunner } from "./AuroraDataApiQueryRunner";
import {
    Connection,
    TypeormAndConnectionOptions,
} from "../../connection/Connection";
import { QueryRunner } from "../..";

/**
 * Organizes communication with MySQL DBMS.
 */
export class AuroraDataApiConnection extends Connection {
    queryRunnter: AuroraDataApiQueryRunner;

    constructor(
        options: TypeormAndConnectionOptions,
        queryRunner: AuroraDataApiQueryRunner
    ) {
        super(options);
        this.queryRunnter = queryRunner;
    }

    public createQueryRunner(mode: "master" | "slave" = "master"): QueryRunner {
        return this.queryRunnter;
    }
}
