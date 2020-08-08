import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { Category } from "./Category";
import { ManyToOne  } from "typeorm-core";
import { ManyToMany } from "typeorm-core";
import { JoinTable } from "typeorm-core";
import { Tag } from "./Tag";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Category, (category) => category.posts, {
        cascade: ["insert"],
    })
    category: Promise<Category>;

    @ManyToMany((type) => Tag, (tag) => tag.posts, {
        cascade: ["insert"],
    })
    @JoinTable()
    tags: Promise<Tag[]>;
}
