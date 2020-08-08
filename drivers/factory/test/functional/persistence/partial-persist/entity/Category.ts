import { PrimaryColumn, Entity, Column, ManyToMany } from "typeorm-core";

import { Post } from "./Post";

@Entity()
export class Category {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    position: number;

    @ManyToMany((type) => Post, (post) => post.categories)
    posts: Post[];
}
