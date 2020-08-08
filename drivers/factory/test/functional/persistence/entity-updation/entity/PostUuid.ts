import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";

@Entity()
export class PostUuid {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    text: string;
}
