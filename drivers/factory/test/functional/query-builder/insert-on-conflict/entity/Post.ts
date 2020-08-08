import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;
}
