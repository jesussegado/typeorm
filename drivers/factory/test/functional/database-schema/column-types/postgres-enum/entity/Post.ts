import {  Column  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("enum", { enum: ["A", "B", "C"] })
    enum: string;

    @Column("simple-enum", { enum: ["A", "B", "C"] })
    simpleEnum: string;

    @Column()
    name: string;
}
