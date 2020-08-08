import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";

@Entity({
    orderBy: {
        myOrder: "DESC",
    },
})
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    myOrder: number;

    @Column()
    num1: number = 1;

    @Column()
    num2: number = 1;
}
