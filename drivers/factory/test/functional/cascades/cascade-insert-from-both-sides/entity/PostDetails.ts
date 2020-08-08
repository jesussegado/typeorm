import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import { Post } from "./Post";
import {  OneToOne  } from "typeorm-core";

@Entity()
export class PostDetails {
    @PrimaryColumn()
    keyword: string;

    @OneToOne((type) => Post, (post) => post.details, {
        cascade: ["insert"],
    })
    post: Post;
}
