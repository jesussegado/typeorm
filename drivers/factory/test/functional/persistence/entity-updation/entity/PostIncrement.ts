import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";

@Entity()
export class PostIncrement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;
}
