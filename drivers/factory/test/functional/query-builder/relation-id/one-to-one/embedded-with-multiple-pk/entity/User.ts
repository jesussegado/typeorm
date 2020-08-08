import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    name: string;
}
