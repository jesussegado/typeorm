import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm-core";
import { Post } from "./Post";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    birthdate: Date;

    @OneToMany((type) => Post, (post) => post.author)
    posts: Post[];
}
