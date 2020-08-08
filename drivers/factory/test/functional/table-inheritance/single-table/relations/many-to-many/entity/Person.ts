import {  Column  } from "typeorm-core";
import {  TableInheritance  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";

@Entity()
@TableInheritance({ column: { name: "type", type: "varchar" } })
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
