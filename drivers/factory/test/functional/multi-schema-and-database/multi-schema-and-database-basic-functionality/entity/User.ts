import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";

@Entity({ schema: "userSchema" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
