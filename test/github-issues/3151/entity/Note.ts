import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    JoinTable,
    ManyToMany,
} from "../../../../src";

import { Category } from "./Category";

@Entity()
export class Note {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    content: string;

    @ManyToMany((type) => Category, (category) => category.notes)
    @JoinTable()
    categories: Category[];
}
