import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import { Post } from "./Post";

@Entity("s_category", {
    orderBy: {
        id: "ASC",
    },
})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne((type) => Post, (post) => post.oneCategory)
    onePost: Promise<Post>;

    @ManyToMany((type) => Post, (post) => post.twoSideCategories)
    twoSidePosts: Promise<Post[]>;

    @OneToMany((type) => Post, (post) => post.twoSideCategory)
    twoSidePosts2: Promise<Post[]>;

    // ManyToMany with named properties
    @ManyToMany((type) => Post, (post) => post.categoriesNamedTable)
    postsNamedTable: Promise<Post[]>;

    // OneToMany with named properties
    @OneToMany((type) => Post, (post) => post.categoryNamedTable)
    onePostsNamedTable: Promise<Post[]>;

    // OneToOne with named properties
    @OneToOne((type) => Post, (post) => post.oneCategoryNamedTable)
    onePostNamedTable: Promise<Post>;
}
