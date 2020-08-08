import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    VersionColumn,
    ManyToOne,
} from "typeorm-core";

import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    rating: number;

    @VersionColumn()
    version: string;

    @ManyToOne((type) => Category)
    category: Category;
}
