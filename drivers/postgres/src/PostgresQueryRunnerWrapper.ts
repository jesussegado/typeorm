import { PostgresQueryRunner } from "./PostgresQueryRunner";

export class PostgresQueryRunnerWrapper extends PostgresQueryRunner {
    driver: any;

    constructor(driver: any, mode: "master" | "slave") {
        super(driver, mode);
    }
}
