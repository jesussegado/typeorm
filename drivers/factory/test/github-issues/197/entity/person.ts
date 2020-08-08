import { Entity, Index, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({
        unique: true,
    })
    @Column()
    firstname: string;

    @Column()
    lastname: string;
}
