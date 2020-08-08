import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import {  CreateDateColumn  } from "typeorm-core";
import { UpdateDateColumn } from "typeorm-core";
import {  VersionColumn  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    updateDate: string;

    @Column({ default: 100 })
    order: number;

    @VersionColumn()
    version: number;

    @Column({ default: 0 })
    triggerValue: number;
}
