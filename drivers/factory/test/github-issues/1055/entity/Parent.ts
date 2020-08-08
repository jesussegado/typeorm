import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Child } from "./Child";
import { OneToMany  } from "typeorm-core";

@Entity()
export class Parent {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToMany((target) => Child, (child) => child.parent, { lazy: true })
    public children: Promise<Child[]>;
}
