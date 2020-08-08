import {  Column  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import { User } from "./User";
import { Subcounters } from "./Subcounters";

export class Counters {
    @Column()
    code: number;

    @Column()
    likes: number;

    @Column()
    comments: number;

    @Column()
    favorites: number;

    @Column(() => Subcounters, { prefix: "subcnt" })
    subcounters: Subcounters;

    @OneToOne(() => User, (user) => user.likedPost)
    @JoinColumn()
    likedUser: User;
}
