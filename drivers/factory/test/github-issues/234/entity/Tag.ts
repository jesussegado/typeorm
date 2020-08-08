import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Post } from "./Post";
import { ManyToMany } from "typeorm-core";
import { Column } from "typeorm-core";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Post, (post) => post.tags)
    posts: Promise<Post[]>;
}
