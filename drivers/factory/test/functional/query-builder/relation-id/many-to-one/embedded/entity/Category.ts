import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { Post } from "./Post";
import {  OneToMany  } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany((type) => Post, (post) => post.counters.category)
    posts: Post[];

    postIds: number[];
}
