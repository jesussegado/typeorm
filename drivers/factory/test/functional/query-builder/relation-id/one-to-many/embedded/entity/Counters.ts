import {  Column  } from "typeorm-core";
import { Category } from "./Category";
import { Subcounters } from "./Subcounters";
import {  OneToMany  } from "typeorm-core";

export class Counters {
    @Column()
    likes: number;

    @Column()
    comments: number;

    @Column()
    favorites: number;

    @OneToMany((type) => Category, (category) => category.posts)
    categories: Category[];

    @Column(() => Subcounters)
    subcounters: Subcounters;

    categoryIds: number[];
}
