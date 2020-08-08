import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";

@Entity()
export class PostMultiplePrimaryKeys {
    @PrimaryColumn()
    firstId: number;

    @PrimaryColumn()
    secondId: number;

    @Column({ default: "Hello Multi Ids" })
    text: string;
}
