import {  PrimaryColumn  } from "typeorm-core";
import { Category } from "./Category";
import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import { Counters } from "./Counters";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column((type) => Counters)
    counters: Counters;

    @ManyToMany((type) => Category, (category) => category.posts, {
        cascade: ["update"],
    })
    @JoinTable()
    categories: Category[];
}
