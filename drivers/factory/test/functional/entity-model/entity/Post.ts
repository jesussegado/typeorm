import { Entity } from "typeorm-core";
import {  BaseEntity  } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { ManyToMany, JoinTable } from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        default: "This is default text.",
    })
    text: string;

    @ManyToMany((type) => Category)
    @JoinTable()
    categories: Category[];
}
