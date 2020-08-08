import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import { Category } from "./Category";
import { Subcounters } from "./Subcounters";

export class Counters {
    @PrimaryColumn()
    code: number;

    @Column()
    likes: number;

    @Column()
    comments: number;

    @Column()
    favorites: number;

    @ManyToMany((type) => Category, (category) => category.posts)
    @JoinTable({ name: "counter_categories" })
    categories: Category[];

    @Column(() => Subcounters)
    subcntrs: Subcounters;

    categoryIds: number[];
}
