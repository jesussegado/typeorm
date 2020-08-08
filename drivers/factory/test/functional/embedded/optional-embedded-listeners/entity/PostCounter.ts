import {  Column  } from "typeorm-core";
import {  BeforeInsert  } from "typeorm-core";
import {  BeforeUpdate  } from "typeorm-core";

export class PostCounter {
    @Column({ nullable: true })
    likes: number;

    @BeforeInsert()
    beforeInsert() {
        this.likes = 0;
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.likes++;
    }
}
