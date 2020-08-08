import { Column } from "typeorm-core";
import { Person } from "./Person";
import {  ChildEntity  } from "typeorm-core";

@ChildEntity()
export class Employee extends Person {
    @Column()
    salary: number;
}
