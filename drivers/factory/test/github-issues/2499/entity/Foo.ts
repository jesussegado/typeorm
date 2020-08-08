import { Column, PrimaryGeneratedColumn } from "typeorm-core";
import { Entity } from "typeorm-core";

@Entity("foo")
export class Foo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
}
