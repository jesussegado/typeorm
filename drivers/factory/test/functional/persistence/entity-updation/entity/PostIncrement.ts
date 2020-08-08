import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class PostIncrement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;
}
