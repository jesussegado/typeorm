import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm-core";

import { Post } from "./Post";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Post, (post) => post.counters.subcounters.watchedUsers)
    @JoinColumn()
    posts: Post[];
}
