import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  BeforeUpdate  } from "typeorm-core";
import {  AfterUpdate  } from "typeorm-core";
import {  DeleteDateColumn  } from "typeorm-core";

@Entity()
export class PostWithDeleteDateColumn {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @DeleteDateColumn()
    deletedAt: Date;

    isSoftRemoved: boolean = false;

    @BeforeUpdate()
    beforeUpdate() {
        this.title += "!";
    }

    @AfterUpdate()
    afterUpdate() {
        this.isSoftRemoved = true;
    }
}
