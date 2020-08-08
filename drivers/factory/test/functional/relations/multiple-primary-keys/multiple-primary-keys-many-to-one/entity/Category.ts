import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import { Post } from "./Post";
import { Unique } from "typeorm-core";

@Entity()
@Unique(["code", "version", "description"])
export class Category {
    @PrimaryColumn()
    name: string;

    @PrimaryColumn()
    type: string;

    @Column()
    code: number;

    @Column()
    version: number;

    @Column({ nullable: true })
    description: string;

    @OneToMany((type) => Post, (post) => post.category)
    posts: Post[];

    @OneToMany((type) => Post, (post) => post.categoryWithJoinColumn)
    postsWithJoinColumn: Post[];

    @OneToMany((type) => Post, (post) => post.categoryWithOptions)
    postsWithOptions: Post[];

    @OneToMany((type) => Post, (post) => post.categoryWithNonPKColumns)
    postsWithNonPKColumns: Post[];
}
