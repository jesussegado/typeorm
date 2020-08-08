import {  PrimaryColumn, OneToMany  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  BaseEntity  } from "typeorm-core";

import { RecordContext } from "./context";

@Entity({ name: "records" })
export class Record extends BaseEntity {
    @PrimaryColumn()
    public id: string;

    @OneToMany((type) => RecordContext, (context) => context.record)
    public contexts: RecordContext[];
}
