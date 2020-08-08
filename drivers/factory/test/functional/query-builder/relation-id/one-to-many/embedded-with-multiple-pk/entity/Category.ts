import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import { Post } from "./Post";
import {  ManyToOne  } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    name: string;

    @ManyToOne((type) => Post, (post) => post.counters.categories)
    post: Post;
}
