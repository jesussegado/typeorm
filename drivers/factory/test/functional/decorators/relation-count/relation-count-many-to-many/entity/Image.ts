import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  RelationCount  } from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Image {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    isRemoved: boolean = false;

    @ManyToMany((type) => Category, (category) => category.images)
    categories: Category[];

    @RelationCount((image: Image) => image.categories)
    categoryCount: number;
}
