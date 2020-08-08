import { Entity, PrimaryColumn, Column, Generated } from "typeorm-core";

@Entity("kollektion")
export class Kollektion {
    @PrimaryColumn("int", { name: "kollektion_id" })
    @Generated()
    id: number;

    @Column({ name: "kollektion_name" })
    name: string;
}
