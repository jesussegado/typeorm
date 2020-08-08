import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
