import {  Column  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { User } from "./User";

export class Subcounters {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    version: number;

    @Column()
    watches: number;

    @OneToOne((type) => User)
    @JoinColumn()
    watchedUser: User;

    watchedUserId: number;
}
