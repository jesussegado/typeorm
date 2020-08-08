import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import { Category } from "./Category";
import {  ManyToMany  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToMany((type) => Category)
    @JoinTable()
    categories: Category[];

    @Column()
    counter: number = 0;
}
