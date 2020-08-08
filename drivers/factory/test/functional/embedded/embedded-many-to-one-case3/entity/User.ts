import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import { Post } from "./Post";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany((type) => Post, (post) => post.counters.likedUser)
    likedPosts: Post[];
}
