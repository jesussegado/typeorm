import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";

export class Subcounters {
    @PrimaryColumn()
    version: number;

    @Column()
    watches: number;
}
