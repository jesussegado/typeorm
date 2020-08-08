import { Entity } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Column } from "typeorm-core";

@Entity("participants")
export class Participant {
    @PrimaryColumn()
    order_id: number;

    @PrimaryColumn()
    distance: string;

    @Column()
    price?: string;
}
