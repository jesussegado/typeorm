import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { ManyToOne  } from "typeorm-core";
import { Post } from "./Post";
import { RelationId} from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { ManyToMany } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryColumn()
    firstId: number;

    @PrimaryColumn()
    secondId: number;

    @Column()
    name: string;

    @ManyToOne((type) => Post, (post) => post.categories)
    post: Post | null;

    @RelationId((category: Category) => category.post)
    postId: number;

    @ManyToMany((type) => Post, (post) => post.manyCategories)
    manyPosts: Post[];

    @RelationId((category: Category) => category.manyPosts)
    manyPostIds: number[];
}
