import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
} from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany((type) => Category, (category) => category.post)
    categories: Category[] | null;

    @ManyToMany((type) => Category, (category) => category.manyPosts)
    @JoinTable()
    manyCategories: Category[];
}
