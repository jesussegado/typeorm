import { Entity, PrimaryGeneratedColumn, Index, Column } from "typeorm-core";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    email: string;

    @Column()
    @Index()
    username: string;

    @Column()
    @Index()
    privilege: number;
}
