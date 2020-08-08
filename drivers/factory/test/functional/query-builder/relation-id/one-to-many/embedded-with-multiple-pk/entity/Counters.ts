import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
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

    @OneToMany((type) => Category, (category) => category.post)
    categories: Category[];

    @Column(() => Subcounters)
    subcounters: Subcounters;

    categoryIds: number[];
}
