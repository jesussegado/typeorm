import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm-core";

import { Category } from "./Category";

@Entity()
export class CategoryMetadata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    keyword: string;

    @OneToOne((type) => Category, (category) => category.metadata)
    category: Category;
}
