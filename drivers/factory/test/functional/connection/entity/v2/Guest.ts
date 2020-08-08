import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import { Comment } from "./Comment";

@Entity()
export class Guest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @OneToMany((type) => Comment, (comment) => comment.author)
    comments: Comment[];
}
