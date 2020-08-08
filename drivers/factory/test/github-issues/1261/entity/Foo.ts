import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import {  BaseEntity  } from "typeorm-core";

@Entity()
export class Foo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
