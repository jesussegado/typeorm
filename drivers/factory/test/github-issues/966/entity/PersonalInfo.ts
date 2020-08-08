import { Column } from "typeorm-core";

export class PersonalInfo {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    address: string;
}
