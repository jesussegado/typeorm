import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class A {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
