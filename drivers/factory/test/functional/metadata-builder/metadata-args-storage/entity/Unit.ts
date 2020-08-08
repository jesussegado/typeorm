import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";

export class Unit {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    type: string;
}
