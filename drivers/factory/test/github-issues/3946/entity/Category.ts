import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { ManyToMany } from "typeorm-core";
import { Post } from "./Post";
import { Image } from "./Image";
import { JoinTable } from "typeorm-core";

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
