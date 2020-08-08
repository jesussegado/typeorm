import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm-core";

@Entity()
@Index("IDX_TEST", ["firstname", "lastname"])
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
}
