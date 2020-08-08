import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { ManyToOne  } from "typeorm-core";
import { Post } from "./Post";
import { PrimaryColumn } from "typeorm-core";
import { RelationId} from "typeorm-core";

@Entity()
export class Category {
    @PrimaryColumn()
    firstId: number;

    @PrimaryColumn()
    secondId: number;

    @Column()
    name: string;

    @ManyToOne((type) => Post, (post) => post.categories)
    post: Post;

    @RelationId((category: Category) => category.post)
    postId: number;
}
