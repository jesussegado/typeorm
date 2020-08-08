import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm-core";

import { Post } from "./Post";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne((type) => Post, (post) => post.category)
    post: Post;
}
