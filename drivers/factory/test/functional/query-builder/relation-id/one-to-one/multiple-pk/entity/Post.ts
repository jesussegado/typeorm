import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import { Category } from "./Category";

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

    @OneToOne((type) => Category, (category) => category.post)
    @JoinColumn()
    category: Category;

    @OneToOne((type) => Category)
    @JoinColumn()
    subcategory: Category;

    categoryId: number;
}
