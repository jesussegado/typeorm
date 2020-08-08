import {  Entity  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";

@Entity()
export class PostDetails {
    @PrimaryColumn()
    keyword: string;
}
