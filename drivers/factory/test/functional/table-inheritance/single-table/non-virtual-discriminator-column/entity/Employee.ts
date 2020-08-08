import { Column, ChildEntity } from "typeorm-core";

import { Person } from "./Person";

@ChildEntity("employee-type")
export class Employee extends Person {
    @Column()
    salary: number;
}
