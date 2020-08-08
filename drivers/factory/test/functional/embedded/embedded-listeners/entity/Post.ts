import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import { PostInformation } from "./PostInformation";
import {  Index  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    title: string;

    @Column()
    text: string;

    @Column((type) => PostInformation, { prefix: "info" })
    information: PostInformation = new PostInformation();
}
