import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm-core";

import { Post } from "./Post";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne((type) => Post, (post) => post.counters.category)
    post: Post;

    postId: number;
}
