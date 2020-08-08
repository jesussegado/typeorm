import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import { ObjectID, ObjectIdColumn } from "typeorm-core";

@Entity()
export class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    text: string;

    // @Column(() => Counters)
    // counters: Counters;
}
