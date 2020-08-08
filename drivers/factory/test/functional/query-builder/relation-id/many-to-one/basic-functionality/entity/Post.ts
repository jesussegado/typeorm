import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import { Category } from "./Category";
import { PostCategory } from "./PostCategory";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne((type) => Category)
    @JoinColumn({ referencedColumnName: "name" })
    categoryByName: Category;

    @ManyToOne((type) => Category)
    @JoinColumn()
    category: Category;

    @OneToMany(
        (type) => PostCategory,
        (postCategoryRelation) => postCategoryRelation.post
    )
    categories: PostCategory[];

    categoryId: number;

    categoryName: string;
}
