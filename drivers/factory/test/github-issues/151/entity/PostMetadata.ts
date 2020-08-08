import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { OneToOne  } from "typeorm-core";
import { Post } from "./Post";

@Entity()
export class PostMetadata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne((type) => Post, (post) => post.metadata)
    post: Post | null;
}
