import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm-core";

import { Category } from "./Category";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne((type) => Category, (category) => category.image)
    category: Category;

    categoryId: number;
}
