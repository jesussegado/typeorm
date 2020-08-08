import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import { Post } from "./Post";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @OneToOne((type) => Post, (post) => post.image)
    post: Post;
}
