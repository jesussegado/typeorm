import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isAdmin: boolean;
}
