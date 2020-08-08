import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import { PostEmbedded } from "./PostEmbedded";
import {  PrimaryColumn  } from "typeorm-core";

@Entity()
export class PostComplex {
    @PrimaryColumn()
    firstId: number;

    @Column({ default: "Hello Complexity" })
    text: string;

    @Column((type) => PostEmbedded)
    embed: PostEmbedded;
}
