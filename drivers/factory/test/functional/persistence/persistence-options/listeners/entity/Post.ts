import {  BeforeInsert  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  AfterRemove  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    isRemoved: boolean = false;

    @BeforeInsert()
    beforeInsert() {
        this.title += "!";
    }

    @AfterRemove()
    afterRemove() {
        this.isRemoved = true;
    }
}
