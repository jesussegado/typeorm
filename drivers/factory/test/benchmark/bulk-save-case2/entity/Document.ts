import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";

@Entity()
export class Document {
    @PrimaryColumn("text")
    id: string;

    @Column("text")
    docId: string;

    @Column("text")
    label: string;

    @Column("text")
    context: string;

    @Column({ type: "jsonb" })
    distributions: Distribution[];

    @Column({ type: "timestamp with time zone" })
    date: Date;
}

export interface Distribution {
    weight: string;
    id: number;
    docId: number;
}
