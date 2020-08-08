import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  DeleteDateColumn  } from "typeorm-core";
import { BaseEntity } from "typeorm-core";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    name: string;
}
