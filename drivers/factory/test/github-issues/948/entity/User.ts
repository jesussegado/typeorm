import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "varchar", array: true })
    roles: string[];
}
