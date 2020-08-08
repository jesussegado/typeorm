import {  ManyToMany  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
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

    @ManyToMany((type) => Category, (category) => category.posts)
    @JoinTable()
    categories: Category[];

    @ManyToMany((type) => Category)
    @JoinTable()
    subcategories: Category[];

    categoryIds: number[];
}
