import { Entity } from "typeorm-core";
import {  ObjectIdColumn  } from "typeorm-core";
import { Column } from "typeorm-core";
import { ObjectID } from "typeorm-core";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;
}
