import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import { User } from "./User";
import {  Column  } from "typeorm-core";
import {  DeleteDateColumn  } from "typeorm-core";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne((type) => User, (user) => user.manyPhotos)
    user: User;

    constructor(name: string) {
        this.name = name;
    }
}
