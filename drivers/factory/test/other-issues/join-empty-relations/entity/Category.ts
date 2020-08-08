import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinTable,
    ManyToMany,
} from "typeorm-core";

import { Author } from "./Author";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Author)
    @JoinTable()
    authors: Author[];
}
