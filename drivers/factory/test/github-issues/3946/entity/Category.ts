import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm-core";

import { Post } from "./Post";
import { Image } from "./Image";

@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    isRemoved: boolean = false;

    @ManyToMany((type) => Post, (post) => post.categories)
    posts: Post[];

    @ManyToMany((type) => Image, (image) => image.categories)
    @JoinTable()
    images: Image[];

    postCount: number;

    removedPostCount: number;

    imageCount: number;

    removedImageCount: number;
}
