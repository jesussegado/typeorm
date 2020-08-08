import { Column } from "typeorm-core";
import { Person, PersonType } from "./Person";
import {  ChildEntity  } from "typeorm-core";

@ChildEntity(PersonType.Employee)
export class Employee extends Person {
    @Column()
    salary: number;

    @Column()
    shared: string;

    constructor() {
        super();
        this.type = 1;
    }
}
