import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import { Content } from "./Content";

@Entity()
export class Post extends Content {
    @Column()
    text: string;
}
