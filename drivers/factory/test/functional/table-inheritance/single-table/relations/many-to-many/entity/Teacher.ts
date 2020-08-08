import {  ChildEntity  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import { Employee } from "./Employee";
import { Specialization } from "./Specialization";

@ChildEntity()
export class Teacher extends Employee {
    @ManyToMany(
        (type) => Specialization,
        (specialization) => specialization.teachers
    )
    @JoinTable({ name: "person_specs" })
    specializations: Specialization[];
}
