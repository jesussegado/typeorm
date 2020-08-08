import { Column, BeforeInsert } from "typeorm-core";
import { Information } from "./Information";

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
