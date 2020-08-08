import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryColumn()
    firstId: number;

    @PrimaryColumn()
    secondId: number;

    @Column()
    title: string;

    @ManyToOne((type) => Category, (category) => category.posts)
    category: Category;
}
