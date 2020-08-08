import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ObjectIdColumn  } from "typeorm-core";
import { ObjectID } from "typeorm-core";

@Entity()
export class PostWithUnderscoreId {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    title: string;
}
