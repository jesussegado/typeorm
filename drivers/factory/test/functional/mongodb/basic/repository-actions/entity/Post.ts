import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ObjectIdColumn  } from "typeorm-core";
import { ObjectID } from "typeorm-core/build/compiled/src/driver/mongodb/MongoDriver";

@Entity()
export class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    index: number;

    // @Column(() => Counters)
    // counters: Counters;
}
