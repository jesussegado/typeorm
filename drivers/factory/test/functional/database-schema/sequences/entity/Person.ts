import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({
        unique: true,
    })
    Name: string;
}
