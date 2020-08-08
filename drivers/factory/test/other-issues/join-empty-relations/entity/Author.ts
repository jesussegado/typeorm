import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
