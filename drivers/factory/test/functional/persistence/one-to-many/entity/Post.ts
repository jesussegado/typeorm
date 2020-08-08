import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    Column,
} from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany((type) => Category, (category) => category.post)
    categories: Category[] | null;

    @Column({
        default: "supervalue",
    })
    title: string;
}
