import { Entity, Column, PrimaryGeneratedColumn } from "../../../../../src";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
