import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";

@Entity()
export class PostWithoutTypes {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    bit: boolean;

    @Column()
    binary: Buffer;

    @Column()
    datetime: Date;
}
