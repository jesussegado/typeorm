import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import { Post } from "./Post";
import { Image } from "./Image";

@Entity()
export class Category {
    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    code: number;

    @Column()
    name: string;

    @Column()
    isRemoved: boolean = false;

    @ManyToMany((type) => Post, (post) => post.categories)
    posts: Post[];

    @ManyToMany((type) => Image, (image) => image.categories)
    @JoinTable()
    images: Image[];

    postIds: number[];

    imageIds: number[];
}
