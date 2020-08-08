import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";

@Entity({ database: "testDB", schema: "questions" })
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
