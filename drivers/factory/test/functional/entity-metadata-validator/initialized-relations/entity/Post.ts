import {  OneToOne  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import { Category } from "./Category";
import {  JoinTable  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToOne((type) => Category)
    @JoinColumn()
    category: Category;

    @ManyToMany((type) => Category)
    @JoinTable()
    categories: Category[] = [];
}
