import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm-core";

import { Post } from "./Post";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Post, (post) => post.counters.categories)
    @JoinColumn()
    posts: Post[];

    postIds: number[];
}
