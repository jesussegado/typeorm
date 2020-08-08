import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
