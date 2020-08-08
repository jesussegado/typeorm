import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import { Post } from "./Post";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    position: number;

    @ManyToMany((type) => Post, (post) => post.categories)
    posts: Post[];
}
