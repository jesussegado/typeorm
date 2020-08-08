import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  BaseEntity  } from "typeorm-core";
import {  Column  } from "typeorm-core";

@Entity("category_test", { schema: "public" })
export class Category extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}
