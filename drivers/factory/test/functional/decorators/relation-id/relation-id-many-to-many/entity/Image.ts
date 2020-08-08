import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";

@Entity()
export class Image {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    isRemoved: boolean = false;
}
