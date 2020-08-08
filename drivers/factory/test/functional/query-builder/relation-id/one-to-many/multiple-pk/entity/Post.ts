import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import { Category } from "./Category";
import {  OneToMany  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    authorId: number;

    @Column()
    title: string;

    @OneToMany((type) => Category, (category) => category.post)
    categories: Category[];

    categoryIds: number[];
}
