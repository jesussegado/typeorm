import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import { Post } from "./Post";
import { Photo } from "./Photo";
import {  JoinColumn  } from "typeorm-core";

@Entity()
export class Details {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToOne((type) => Post, (post) => post.details)
    post: Post;

    @OneToOne((type) => Photo, (photo) => photo.details, {
        nullable: false,
    })
    @JoinColumn()
    photo: Photo;
}
