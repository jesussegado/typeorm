import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import { Category } from "./Category";
import { Image } from "./Image";
import {  ManyToMany  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne((type) => Category, (category) => category.posts)
    category: Category;

    @ManyToMany((type) => Image, (image) => image.posts)
    @JoinTable()
    images: Image[];
}
