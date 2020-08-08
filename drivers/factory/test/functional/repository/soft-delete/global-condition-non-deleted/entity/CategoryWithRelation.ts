import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import { PostWithRelation } from "./PostWithRelation";

@Entity()
export class CategoryWithRelation {
    @PrimaryColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToOne((type) => PostWithRelation, (post) => post.category)
    post: PostWithRelation;
}
