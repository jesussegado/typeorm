import { Column, TableInheritance, Entity, PrimaryColumn } from "typeorm-core";

@Entity()
@TableInheritance({ column: { name: "type", type: "varchar" } })
export class Person {
    @PrimaryColumn("int")
    id: number;

    @Column()
    name: string;
}
