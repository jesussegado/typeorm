import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { Post } from "./Post";
import {  Column  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Post, (post) => post.categories)
    post: Post;

    @ManyToMany((type) => Post, (post) => post.manyCategories)
    manyPosts: Post[];
}
