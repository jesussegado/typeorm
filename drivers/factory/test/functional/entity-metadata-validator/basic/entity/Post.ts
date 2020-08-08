import {  OneToOne  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  RelationCount  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToOne((type) => Category)
    category: Category;

    @ManyToMany((type) => Category)
    category2: Category;

    @RelationCount((post: Post) => post.category)
    categoryCount: number;

    @RelationCount((post: Post) => post.category2)
    categoryCount2: number;
}
