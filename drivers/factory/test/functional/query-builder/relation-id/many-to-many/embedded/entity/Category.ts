import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { Post } from "./Post";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Post, (post) => post.counters.categories)
    posts: Post[];

    postIds: number[];
}
