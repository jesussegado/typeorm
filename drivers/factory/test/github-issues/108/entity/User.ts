import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
}
