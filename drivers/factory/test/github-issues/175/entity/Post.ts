import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    OneToMany,
} from "typeorm-core";

import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany((type) => Category)
    @JoinTable()
    categories: Category[];

    @OneToMany((type) => Category, (category) => category.post)
    secondaryCategories: Category[];
}
