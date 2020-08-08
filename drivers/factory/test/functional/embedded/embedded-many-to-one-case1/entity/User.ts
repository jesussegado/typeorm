import { Column, PrimaryColumn, Entity, OneToMany } from "typeorm-core";

import { Post } from "./Post";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany((type) => Post, (post) => post.counters.likedUser)
    likedPosts: Post[];
}
