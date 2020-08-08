import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { OneToMany  } from "typeorm-core";
import { Category } from "./Category";
import { RelationId} from "typeorm-core";
import { ManyToMany } from "typeorm-core";
import { JoinTable } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany((type) => Category, (category) => category.post)
    categories: Category[];

    @RelationId((post: Post) => post.categories)
    categoryIds: { firstId: number; secondId: number }[];

    @ManyToMany((type) => Category, (category) => category.manyPosts)
    @JoinTable()
    manyCategories: Category[];

    @RelationId((post: Post) => post.manyCategories)
    manyCategoryIds: { firstId: number; secondId: number }[];
}
