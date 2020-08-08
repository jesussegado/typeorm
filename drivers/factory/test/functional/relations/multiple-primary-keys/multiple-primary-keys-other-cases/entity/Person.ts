import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import { User } from "./User";

@Entity()
export class Person {
    @Column()
    fullName: string;

    @OneToOne((type) => User, { primary: true })
    @JoinColumn()
    user: User;
}
