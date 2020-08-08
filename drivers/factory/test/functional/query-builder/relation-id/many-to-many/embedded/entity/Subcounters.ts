import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { User } from "./User";

export class Subcounters {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    version: number;

    @Column()
    watches: number;

    @ManyToMany((type) => User)
    @JoinTable({ name: "subcnt_users" })
    watchedUsers: User[];

    watchedUserIds: number[];
}
