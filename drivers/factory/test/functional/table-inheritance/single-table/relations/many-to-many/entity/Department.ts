import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
} from "typeorm-core";

import { Accountant } from "./Accountant";

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Accountant, (accountant) => accountant.departments)
    accountants: Accountant[];
}
