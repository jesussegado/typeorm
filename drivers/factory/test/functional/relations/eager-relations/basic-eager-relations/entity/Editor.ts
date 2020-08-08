import {  Entity  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import { User } from "./User";
import {  ManyToOne  } from "typeorm-core";
import { Post } from "./Post";

@Entity()
export class Editor {
    @OneToOne((type) => User, { eager: true, primary: true })
    @JoinColumn()
    user: User;

    @ManyToOne((type) => Post, { primary: true })
    post: Post;
}
