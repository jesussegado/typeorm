import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { PostDetails } from "./PostDetails";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    key: number;

    @OneToOne((type) => PostDetails, (details) => details.post, {
        cascade: ["insert"],
    })
    @JoinColumn()
    details: PostDetails;

    @Column()
    title: string;
}
