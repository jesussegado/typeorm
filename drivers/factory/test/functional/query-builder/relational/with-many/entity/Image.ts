import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import { Post } from "./Post";
import {  ManyToMany  } from "typeorm-core";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToMany((type) => Post, (post) => post.images)
    posts: Post[];
}
