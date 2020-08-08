import { ChildEntity, Column } from "typeorm-core";
import { Person } from "./Person";

@ChildEntity()
export class Women extends Person {
    @Column("int")
    brassiereSize: number;
}
