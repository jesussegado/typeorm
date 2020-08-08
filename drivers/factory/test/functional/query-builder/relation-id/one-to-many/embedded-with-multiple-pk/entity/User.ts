import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import { Post } from "./Post";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    name: string;

    @ManyToOne((type) => Post, (post) => post.counters.subcounters.watchedUsers)
    post: Post;
}
