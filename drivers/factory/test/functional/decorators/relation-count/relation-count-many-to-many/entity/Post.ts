import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import {  RelationCount  } from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    isRemoved: boolean = false;

    @ManyToMany((type) => Category, (category) => category.posts)
    @JoinTable()
    categories: Category[];

    @RelationCount((post: Post) => post.categories)
    categoryCount: number;

    @RelationCount((post: Post) => post.categories, "removedCategories", (qb) =>
        qb.andWhere("removedCategories.isRemoved = :isRemoved", {
            isRemoved: true,
        })
    )
    removedCategoryCount: number;
}
