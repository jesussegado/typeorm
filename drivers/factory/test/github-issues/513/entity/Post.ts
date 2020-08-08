import { Entity } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn("int")
    id: number;

    @Column({ type: "datetime", nullable: true })
    dateTimeColumn: Date;

    @Column({ type: "time", nullable: true })
    timeColumn: Date;
}
