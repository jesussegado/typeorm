import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class B {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
