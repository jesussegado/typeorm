import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  CreateDateColumn  } from "typeorm-core";
import {  UpdateDateColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  VersionColumn  } from "typeorm-core";

@Entity()
export class PostSpecialColumns {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @VersionColumn()
    version: number;
}
