import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from "typeorm-core";

import { Category } from "./Category";

@Entity({
    database: "yoman",
})
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Category)
    @JoinTable({ database: "yoman" })
    categories: Category[];
}
