import { Entity, PrimaryGeneratedColumn, Index, Column } from "typeorm-core";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    username: string;
}
