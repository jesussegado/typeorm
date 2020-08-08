import { ChildEntity, Column } from "typeorm-core";
import { Person } from "./Person";

@ChildEntity()
export class Men extends Person {
    @Column("varchar")
    beardColor: string;
}
