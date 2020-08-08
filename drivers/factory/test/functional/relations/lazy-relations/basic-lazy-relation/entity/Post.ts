import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from "typeorm-core";

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
