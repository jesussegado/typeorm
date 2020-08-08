import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post {
    @ManyToOne((type) => Category, (category) => category.posts, {
        primary: true,
        cascade: ["insert"],
    })
    category: Category;

    @Column()
    title: string;
}
