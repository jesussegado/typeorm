import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import { User } from "./User";
import {  ManyToOne  } from "typeorm-core";

export class Subcounters {
    @PrimaryColumn()
    version: number;

    @Column()
    watches: number;

    @ManyToOne((type) => User)
    watchedUser: User;

    watchedUserId: number;
}
