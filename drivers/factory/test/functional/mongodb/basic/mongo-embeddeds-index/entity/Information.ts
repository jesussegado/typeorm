import {  Column  } from "typeorm-core";
import {  Index  } from "typeorm-core";

export class Information {
    @Column()
    description: string;

    @Column()
    @Index("post_likes")
    likes: number;
}
