import {  ChildEntity  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import { Person } from "./Person";
import { Faculty } from "./Faculty";
import {  JoinTable  } from "typeorm-core";

@ChildEntity()
export class Student extends Person {
    @ManyToMany((type) => Faculty, (faculty) => faculty.students)
    @JoinTable()
    faculties: Faculty[];
}
