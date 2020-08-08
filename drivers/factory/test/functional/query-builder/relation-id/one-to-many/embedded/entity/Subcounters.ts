import {  Column  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { User } from "./User";

export class Subcounters {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    version: number;

    @Column()
    watches: number;

    @OneToMany((type) => User, (user) => user.posts)
    watchedUsers: User[];

    watchedUserIds: number[];
}
