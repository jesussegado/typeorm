import { Column } from "../../../../src/decorator/columns/Column";

export class PersonalInfo {
    @Column()
    firstName: string;


    @Column()
    lastName: string;


    @Column()
    address: string;
}
