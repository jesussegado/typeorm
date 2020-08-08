import { Entity } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { Generated} from "typeorm-core";

@Entity("kollektion")
export class Kollektion {
    @PrimaryColumn("int", { name: "kollektion_id" })
    @Generated()
    id: number;

    @Column({ name: "kollektion_name" })
    name: string;
}
