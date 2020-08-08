import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    ManyToOne,
    JoinTable,
} from "typeorm-core";

import { Category } from "./Category";

import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne((type) => User)
    author: User;

    @ManyToMany((type) => Category)
    @JoinTable()
    categories: Category[];
}
