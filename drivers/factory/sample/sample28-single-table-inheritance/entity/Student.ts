import {Column} from "typeorm-core/build/compiled/src/decorator/columns/Column";
import {Person} from "./Person";
import {ChildEntity} from "typeorm-core/build/compiled/src/decorator/entity/ChildEntity";

@ChildEntity()
export class Student extends Person {

    @Column()
    faculty: string;

}
