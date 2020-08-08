import { ChildEntity, ManyToMany, JoinTable } from "typeorm-core";

import { Employee } from "./Employee";
import { Department } from "./Department";

@ChildEntity()
export class Accountant extends Employee {
    @ManyToMany((type) => Department, (department) => department.accountants)
    @JoinTable()
    departments: Department[];
}
