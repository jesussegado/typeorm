import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { PostDetails } from "./PostDetails";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne((type) => PostDetails)
    @JoinColumn()
    details: PostDetails;

    @Column()
    title: string;
}
