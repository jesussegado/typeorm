import {  Entity  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import { Post } from "./Post";

@Entity()
export class Category {
    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    name: string;

    @ManyToMany((type) => Post, (post) => post.counters.categories)
    posts: Post[];

    postIds: number[];
}
