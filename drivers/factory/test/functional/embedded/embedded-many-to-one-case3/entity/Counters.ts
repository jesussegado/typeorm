import {  Column  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import { User } from "./User";
import { Subcounters } from "./Subcounters";
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

    @ManyToOne((type) => User)
    @JoinColumn()
    likedUser: User;
}
