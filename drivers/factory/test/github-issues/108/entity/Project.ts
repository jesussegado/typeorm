import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
}
