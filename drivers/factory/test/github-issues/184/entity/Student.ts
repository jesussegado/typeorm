import { Column } from "typeorm-core";
import { Person, PersonType } from "./Person";
import {  ChildEntity  } from "typeorm-core";

@ChildEntity(PersonType.Student) // required
export class Student extends Person {
    @Column()
    faculty: string;

    constructor() {
        super();
        this.type = 3;
    }
}
