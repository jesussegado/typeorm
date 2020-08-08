import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";

@Entity()
export class Record {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}
