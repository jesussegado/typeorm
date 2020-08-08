import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
} from "typeorm-core";

import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany(() => Category, (category) => category.posts, {
        cascade: ["insert"],
    })
    categories: Category[];
}
