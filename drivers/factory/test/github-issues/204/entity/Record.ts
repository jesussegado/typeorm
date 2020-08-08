import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

import { RecordData } from "./RecordData";
import { RecordConfig } from "./RecordConfig";

@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "json" })
    configs: RecordConfig[];

    @Column({ type: "jsonb" })
    datas: RecordData[];
}
