import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { Question } from "./Question";
import {  ManyToOne  } from "typeorm-core";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Question, {
        cascade: ["insert"],
        nullable: true,
    })
    question: Question;
}
