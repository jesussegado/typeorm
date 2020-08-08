import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { Post } from "./Post";
import { ManyToMany } from "typeorm-core";
import { JoinTable } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column()
    name: string;

    @ManyToMany(() => Post, (post) => post.categories)
    @JoinTable()
    posts: Post[];
}
