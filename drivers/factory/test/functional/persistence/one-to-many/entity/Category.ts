import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import { Post } from "./Post";
import {  Column  } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Post, (post) => post.categories)
    post: Post;

    @Column()
    name: string;
}
