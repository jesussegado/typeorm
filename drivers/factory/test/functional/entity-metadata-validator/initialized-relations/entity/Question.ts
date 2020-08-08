import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import { Category } from "./Category";
import {  JoinTable  } from "typeorm-core";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany((type) => Category, { persistence: false })
    @JoinTable()
    categories: Category[] = [];
}
