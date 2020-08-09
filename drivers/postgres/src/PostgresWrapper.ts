import { PostgresDriver } from "./PostgresDriver";

export abstract class PostgresWrapper extends PostgresDriver {
    options: any;

    abstract createQueryRunner(mode: "master" | "slave"): any;
}
