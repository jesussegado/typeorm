import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import { Category } from "./Category";
import { Image } from "./Image";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne((type) => Category)
    category: Category;

    @OneToOne((type) => Image, (image) => image.post)
    @JoinColumn()
    image: Image;
}
