import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  VersionColumn  } from "typeorm-core";
import {  UpdateDateColumn  } from "typeorm-core";

@Entity("post_with_v_ud")
export class PostWithVersionAndUpdatedDate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @VersionColumn()
    version: number;

    @UpdateDateColumn()
    updateDate: Date;
}
