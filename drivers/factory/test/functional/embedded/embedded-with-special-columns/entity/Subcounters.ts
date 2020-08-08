import {  Column  } from "typeorm-core";
import {  VersionColumn  } from "typeorm-core";

export class Subcounters {
    @VersionColumn()
    version: number;

    @Column()
    watches: number;
}
