import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm-core";

import { Post } from "./Post";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Post, (post) => post.categories, {
        onDelete: "CASCADE",
    })
    post: Post;
}
