import {  ManyToMany  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne((type) => Tag)
    tag: Tag;

    tagId: number;

    @ManyToMany((type) => Category, (category) => category.posts)
    @JoinTable()
    categories: Category[];

    @ManyToMany((type) => Category)
    @JoinTable()
    subcategories: Category[];

    categoryIds: number[];
}
