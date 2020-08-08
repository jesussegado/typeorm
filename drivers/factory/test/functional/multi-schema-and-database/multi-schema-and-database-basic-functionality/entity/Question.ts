import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

@Entity({ database: "testDB", schema: "questions" })
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
