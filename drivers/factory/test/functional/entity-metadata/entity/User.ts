import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    ManyToMany,
} from "typeorm-core";

import { Post } from "./Post";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Post, (post) => post.counters.likedUsers)
    likedPosts: Post[];
}
