import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    isRemoved: boolean = false;

    @ManyToOne((type) => Category)
    category: Category;

    categoryId: number;
}
