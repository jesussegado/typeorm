import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class Faculty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
