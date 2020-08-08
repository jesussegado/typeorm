import { Column, PrimaryGeneratedColumn, Entity } from "typeorm-core";

@Entity("foo")
export class Foo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
}
