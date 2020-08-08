import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToMany((type) => Category)
    @JoinTable()
    categories: Promise<Category[]>;

    @ManyToMany((type) => Category, (category) => category.twoSidePosts)
    @JoinTable()
    twoSideCategories: Promise<Category[]>;

    @Column()
    viewCount: number = 0;

    @ManyToOne((type) => Category)
    category: Promise<Category>;

    @OneToOne((type) => Category, (category) => category.onePost)
    @JoinColumn()
    oneCategory: Promise<Category>;

    @ManyToOne((type) => Category, (category) => category.twoSidePosts2)
    twoSideCategory: Promise<Category>;
}
