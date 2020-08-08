import {  Column  } from "typeorm-core";
import { Category } from "./Category";
import { Subcounters } from "./Subcounters";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";

export class Counters {
    @Column()
    likes: number;

    @Column()
    comments: number;

    @Column()
    favorites: number;

    @OneToOne((type) => Category, (category) => category.post)
    @JoinColumn()
    category: Category;

    @Column(() => Subcounters)
    subcounters: Subcounters;

    categoryId: number;
}
