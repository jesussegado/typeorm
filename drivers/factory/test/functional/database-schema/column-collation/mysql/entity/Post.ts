import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @Column({ collation: "ascii_general_ci" })
    name: string;

    @Column({ charset: "utf8" })
    title: string;

    @Column({ charset: "cp852", collation: "cp852_general_ci" })
    description: string;
}
