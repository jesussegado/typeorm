import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { Post } from "./Post";
import {  ManyToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Post, (post) => post.counters.categories)
    @JoinColumn()
    posts: Post[];

    postIds: number[];
}
