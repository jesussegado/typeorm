import { Column } from "typeorm-core";
import { Person } from "./Person";
import {  ChildEntity  } from "typeorm-core";

@ChildEntity()
export class Student extends Person {
    @Column()
    faculty: string;
}
