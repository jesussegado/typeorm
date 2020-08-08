import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import { Post } from "./Post";
import { Tag } from "./Tag";
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

    @OneToOne((type) => Post, (post) => post.category)
    post: Post;

    @OneToOne((type) => Post, (post) => post.categoryWithOptions)
    postWithOptions: Post;

    @OneToOne((type) => Post, (post) => post.categoryWithNonPKColumns)
    postWithNonPKColumns: Post;

    @OneToOne((type) => Tag, (tag) => tag.category)
    tag: Tag;

    @OneToOne((type) => Tag, (tag) => tag.categoryWithOptions)
    tagWithOptions: Tag;

    @OneToOne((type) => Tag, (tag) => tag.categoryWithNonPKColumns)
    tagWithNonPKColumns: Tag;
}
