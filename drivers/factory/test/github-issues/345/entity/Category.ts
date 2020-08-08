import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm-core";

import { Post } from "./Post";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column()
    name: string;

    @ManyToMany(() => Post, (post) => post.categories)
    @JoinTable()
    posts: Post[];
}
