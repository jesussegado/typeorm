import {  Column  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import { Post } from "./Post";
import {  PrimaryColumn  } from "typeorm-core";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    personId: number;

    @Column()
    name: string;

    @ManyToMany((type) => Post, (post) => post.counters.likedUsers)
    likedPosts: Post[];
}
