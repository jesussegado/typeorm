import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import { Subcounters } from "./Subcounters";
import { User } from "./User";
import {  PrimaryColumn  } from "typeorm-core";

export class Counters {
    @PrimaryColumn()
    code: number;

    @Column()
    likes: number;

    @Column()
    comments: number;

    @Column()
    favorites: number;

    @Column(() => Subcounters, { prefix: "subcnt" })
    subcounters: Subcounters;

    @ManyToMany((type) => User, (user) => user.likedPosts)
    @JoinTable()
    likedUsers: User[];
}
