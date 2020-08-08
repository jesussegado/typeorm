import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import { Category } from "./Category";
import {  Generated  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn({ name: "theId" })
    @Generated()
    id: number;

    @Column()
    title: string;

    @ManyToOne((type) => Category, (category) => category.posts, {
        cascade: ["insert"],
    })
    category: Category;
}
