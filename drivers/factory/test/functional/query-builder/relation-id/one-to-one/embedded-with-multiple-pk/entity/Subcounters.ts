import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import { User } from "./User";

export class Subcounters {
    @PrimaryColumn()
    version: number;

    @Column()
    watches: number;

    @OneToOne((type) => User)
    @JoinColumn()
    watchedUser: User;

    watchedUserId: number;
}
