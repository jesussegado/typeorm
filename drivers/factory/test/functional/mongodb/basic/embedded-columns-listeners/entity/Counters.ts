import {  Column  } from "typeorm-core";
import { Information } from "./Information";
import { BeforeInsert } from "typeorm-core";

export class Counters {
    @Column()
    likes: number;

    @Column((type) => Information)
    information?: Information;

    @BeforeInsert()
    beforeInsert() {
        this.likes = 100;
    }
}
