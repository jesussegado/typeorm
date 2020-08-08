import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import { Post } from "./Post";
import {  OneToOne  } from "typeorm-core";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => Post, (post) => post.counters.likedUser)
    likedPost: Post;
}
