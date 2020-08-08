import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryColumn()
    id: number;

    @Column({ unique: true })
    name: string;
}
