import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";

@Entity({
    schema: "yoman",
})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
