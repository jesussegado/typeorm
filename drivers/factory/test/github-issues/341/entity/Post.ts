import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from "typeorm-core";

import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    categoryName: string;

    @OneToOne((type) => Category, (category) => category.post)
    @JoinColumn({ name: "categoryName", referencedColumnName: "name" })
    category: Category;
}
