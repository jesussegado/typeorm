import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import {  RelationId  } from "typeorm-core";
import { Post } from "./Post";

@Entity()
export class Category {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany((type) => Post, (post) => post.category)
    posts: Post[];

    @RelationId((category: Category) => category.posts)
    postIds: number[];

    @RelationId((category: Category) => category.posts, "removedPosts", (qb) =>
        qb.andWhere("removedPosts.isRemoved = :isRemoved", { isRemoved: true })
    )
    removedPostIds: number[];
}
