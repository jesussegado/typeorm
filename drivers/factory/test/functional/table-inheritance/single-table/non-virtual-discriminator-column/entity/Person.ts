import {
    Column,
    TableInheritance,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm-core";

@Entity()
@TableInheritance({ column: { name: "type", type: "varchar" } })
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;
}
