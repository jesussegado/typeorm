import { Column, PrimaryGeneratedColumn, Entity } from "typeorm-core";

import { WrappedNumber, transformer } from "../transformer";

@Entity()
export class Dummy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int", { transformer })
    num: WrappedNumber;
}
