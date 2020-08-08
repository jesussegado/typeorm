import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";

export class Counters {
    @PrimaryColumn()
    code: number;

    @Column()
    likes: number;

    @Column()
    comments: number;

    @Column()
    favorites: number;
}
