import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import { Post } from "./Post";
import {  JoinTable  } from "typeorm-core";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Post, (post) => post.counters.likedUsers)
    @JoinTable()
    likedPosts: Post[];
}
