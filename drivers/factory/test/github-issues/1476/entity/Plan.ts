import {  Entity, PrimaryColumn, Column  } from "typeorm-core";

@Entity()
export class Plan {
    @PrimaryColumn()
    planId: number;

    @Column()
    planName: string;
}
