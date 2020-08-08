import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
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

    @ManyToOne((type) => Post, (post) => post.categories)
    post: Post;

    @OneToMany((type) => Image, (image) => image.category)
    images: Image[];

    postId: number;

    imageIds: number[];
}
