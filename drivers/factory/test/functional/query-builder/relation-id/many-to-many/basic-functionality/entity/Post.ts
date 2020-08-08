import {
    ManyToMany,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinTable,
} from "typeorm-core";

import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne((type) => Tag)
    tag: Tag;

    tagId: number;

    @ManyToMany((type) => Category, (category) => category.posts)
    @JoinTable()
    categories: Category[];

    @ManyToMany((type) => Category)
    @JoinTable()
    subcategories: Category[];

    categoryIds: number[];
}
