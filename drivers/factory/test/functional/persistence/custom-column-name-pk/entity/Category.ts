import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import { Post } from "./Post";
import {  OneToMany  } from "typeorm-core";
import {  Generated  } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryColumn({ name: "theId" })
    @Generated()
    id: number;

    @Column()
    name: string;

    @OneToMany((type) => Post, (post) => post.category, {
        cascade: ["insert"],
    })
    posts: Post[];
}
