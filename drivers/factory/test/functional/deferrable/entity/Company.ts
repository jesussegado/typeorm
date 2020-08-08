import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";

@Entity()
export class Company {
    @PrimaryColumn()
    id: number;

    @Column()
    name?: string;
}
