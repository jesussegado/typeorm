import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { Post } from "./Post";
import { ManyToOne  } from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class PostCategory {
    @ManyToOne((type) => Post, (post) => post.categories, {
        primary: true,
        cascade: ["insert"],
    })
    post: Post;

    @ManyToOne((type) => Category, (category) => category.posts, {
        primary: true,
        cascade: ["insert"],
    })
    category: Category;

    @Column()
    addedByAdmin: boolean;

    @Column()
    addedByUser: boolean;
}
