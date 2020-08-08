import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm-core";

import { Company } from "./Company";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Company, (company) => company.id, {
        deferrable: "INITIALLY DEFERRED",
    })
    company: Company;
}
