import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
