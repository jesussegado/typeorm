import { Column } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { Answer } from "./Answer";
import {  OneToMany  } from "typeorm-core";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: "My question" })
    name: string;

    @OneToMany((type) => Answer, (answer) => answer.question, {
        cascade: ["insert"],
    })
    answers: Answer[];
}
