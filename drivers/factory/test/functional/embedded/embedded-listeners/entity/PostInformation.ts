import {  Column  } from "typeorm-core";
import { PostCounter } from "./PostCounter";
import {  BeforeInsert  } from "typeorm-core";
import {  Index  } from "typeorm-core";

export class PostInformation {
    @Column()
    @Index()
    description: string;

    @Column((type) => PostCounter, { prefix: "counters" })
    counters: PostCounter = new PostCounter();

    @BeforeInsert()
    beforeInsert() {
        this.description = "default post description";
    }
}
