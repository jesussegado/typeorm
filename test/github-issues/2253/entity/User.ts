import {
    Column,
    Entity,
    PrimaryColumn,
    TableInheritance,
} from "../../../../src";

@TableInheritance({ column: "type" })
@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    type: string;
}


