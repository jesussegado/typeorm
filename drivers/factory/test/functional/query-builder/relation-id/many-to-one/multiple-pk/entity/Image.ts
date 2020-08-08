import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany((type) => Category, (category) => category.image)
    categories: Category[];

    categoryIds: number[];
}
