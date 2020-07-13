import {
    ChildEntity,
    Column
} from "../../../../src";
import { User } from './User';

@ChildEntity("sub")
export class SubUser extends User {
    @Column()
    anotherColumn: number;
}
