import { Entity, PrimaryColumn, Column } from "typeorm-core";

@Entity()
export class Item {
    @PrimaryColumn()
    itemId: number;

    @Column()
    planId: number;
}
