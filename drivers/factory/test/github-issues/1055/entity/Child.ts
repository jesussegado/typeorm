import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Parent } from "./Parent";
import { ManyToOne  } from "typeorm-core";

@Entity()
export class Child {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToOne((target) => Parent, (parent) => parent.id, { lazy: true })
    public parent: Promise<Parent> | Parent | number;
}
