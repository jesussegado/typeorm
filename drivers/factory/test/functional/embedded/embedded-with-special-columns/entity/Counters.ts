import {  Column  } from "typeorm-core";
import {  CreateDateColumn  } from "typeorm-core";
import {  UpdateDateColumn  } from "typeorm-core";
import {  DeleteDateColumn  } from "typeorm-core";
import { Subcounters } from "./Subcounters";

export class Counters {
    @Column()
    likes: number;

    @Column()
    comments: number;

    @Column()
    favorites: number;

    @Column(() => Subcounters, { prefix: "subcnt" })
    subcounters: Subcounters;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
