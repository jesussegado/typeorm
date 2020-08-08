import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm-core";

import { Post } from "./Post";

@Entity({ schema: "guest" })
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Post)
    post: Post;
}
