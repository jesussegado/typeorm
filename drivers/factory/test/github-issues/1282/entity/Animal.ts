import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
} from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Category, { eager: true })
    @JoinTable()
    categories: Category[];
}
