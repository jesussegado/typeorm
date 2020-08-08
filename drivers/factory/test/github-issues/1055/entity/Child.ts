import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm-core";

import { Parent } from "./Parent";

@Entity()
export class Child {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToOne((target) => Parent, (parent) => parent.id, { lazy: true })
    public parent: Promise<Parent> | Parent | number;
}
