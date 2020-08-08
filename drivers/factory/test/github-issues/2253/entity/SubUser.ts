import { ChildEntity, Column } from "typeorm-core";
import { User } from "./User";

@ChildEntity("sub")
export class SubUser extends User {
    @Column()
    anotherColumn: number;
}
