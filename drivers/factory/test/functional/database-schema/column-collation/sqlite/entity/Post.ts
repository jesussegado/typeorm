import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @Column({ collation: "RTRIM" })
    name: string;
}
