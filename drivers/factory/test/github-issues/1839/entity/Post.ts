import { Entity, ManyToMany, PrimaryColumn } from "typeorm-core";
import { JoinTable } from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryColumn({ collation: "utf8_unicode_ci", charset: "utf8" })
    id: string;

    @ManyToMany((type) => Category, (category) => category.posts)
    @JoinTable()
    categories: Category[];
}
