import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
