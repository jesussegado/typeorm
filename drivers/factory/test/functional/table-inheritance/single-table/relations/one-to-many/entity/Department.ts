import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm-core";

import { Accountant } from "./Accountant";

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Accountant, (accountant) => accountant.departments)
    accountant: Accountant;
}
