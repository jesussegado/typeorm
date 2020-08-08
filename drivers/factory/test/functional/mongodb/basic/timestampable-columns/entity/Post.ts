import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ObjectIdColumn  } from "typeorm-core";
import {  CreateDateColumn  } from "typeorm-core";
import {  UpdateDateColumn  } from "typeorm-core";
import { ObjectID } from "typeorm-core";

@Entity()
export class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    message: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}
