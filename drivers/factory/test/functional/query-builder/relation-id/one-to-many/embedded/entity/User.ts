import {  Column  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import { Post } from "./Post";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Post, (post) => post.counters.subcounters.watchedUsers)
    @JoinColumn()
    posts: Post[];
}
