import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import { Category } from "./Category";
import {  ManyToOne  } from "typeorm-core";
import { User } from "./User";
import {  JoinTable  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne((type) => User)
    author: User;

    @ManyToMany((type) => Category)
    @JoinTable()
    categories: Category[];
}
