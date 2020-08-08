import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";

@Entity("post_without_v_ud")
export class PostWithoutVersionAndUpdateDate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
}
