import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm-core";

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
