import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    count: number;

    @ManyToMany((type) => Category)
    @JoinTable()
    categories: Category[];
}
