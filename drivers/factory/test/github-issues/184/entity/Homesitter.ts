import { Column } from "typeorm-core";
import { Person, PersonType } from "./Person";
import {  ChildEntity  } from "typeorm-core";

@ChildEntity(PersonType.Homesitter) // required
export class Homesitter extends Person {
    @Column()
    numberOfKids: number;

    @Column()
    shared: string;

    constructor() {
        super();
        this.type = 2;
    }
}
