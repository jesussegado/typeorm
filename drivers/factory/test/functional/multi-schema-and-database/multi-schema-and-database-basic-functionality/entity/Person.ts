import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";

@Entity({ database: "secondDB" })
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
