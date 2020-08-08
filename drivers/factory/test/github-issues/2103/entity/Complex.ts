import { Entity, Column, PrimaryColumn } from "typeorm-core";

@Entity()
export class Complex {
    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    code: number;

    @Column()
    x: number;
}
