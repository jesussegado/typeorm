import { Category } from "./Category";
import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import {  Column  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany((type) => Category, (category) => category.post)
    categories: Category[] | null;

    @Column({
        default: "supervalue",
    })
    title: string;
}
