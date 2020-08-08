import {
    Column,
    Entity,
    PrimaryColumn,
    TableInheritance,
} from "typeorm-core";

@TableInheritance({ column: "type" })
@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    type: string;
}
