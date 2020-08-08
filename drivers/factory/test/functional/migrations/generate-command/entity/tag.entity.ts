import {  PrimaryColumn  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  BaseEntity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import { Post } from "./post.entity";

@Entity("tag_test", { schema: "public" })
export class Tag extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Post)
    @JoinColumn({ name: "tag_to_post" })
    posts: Post | null;
}
