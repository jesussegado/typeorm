import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import { Category } from "./Category";
import {  ManyToOne  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    authorId: number;

    @Column()
    title: string;

    @Column()
    isRemoved: boolean = false;

    @ManyToOne((type) => Category, (category) => category.posts)
    category: Category;

    @ManyToOne((type) => Category)
    subcategory: Category;

    categoryId: number;
}
