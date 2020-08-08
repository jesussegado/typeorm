import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    Column,
} from "typeorm-core";

import { Category } from "./Category";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany("Category")
    @JoinTable()
    categories: Category[];
}
