import { Column } from "typeorm-core";
import {  TableInheritance  } from "typeorm-core";
import { Entity } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";

export enum PersonType {
    Employee = 1,
    Homesitter = 2,
    Student = 3,
}

@Entity("issue184_person")
@TableInheritance({ column: { name: "type", type: "int" } })
export abstract class Person {
    @PrimaryColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    type: PersonType;
}
