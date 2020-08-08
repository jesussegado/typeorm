import { Entity, Column, PrimaryColumn } from "typeorm-core";

@Entity()
export class Company {
    @PrimaryColumn()
    id: number;

    @Column()
    name?: string;
}
