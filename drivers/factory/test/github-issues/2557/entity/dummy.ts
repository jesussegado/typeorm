import { Column } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Entity } from "typeorm-core";
import { WrappedNumber, transformer } from "../transformer";

@Entity()
export class Dummy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int", { transformer })
    num: WrappedNumber;
}
