import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;
}
