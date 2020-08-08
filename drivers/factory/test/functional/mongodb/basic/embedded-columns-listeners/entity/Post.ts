import { Entity, Column, ObjectIdColumn } from "typeorm-core";

import { ObjectID } from "typeorm-core/build/compiled/src/driver/mongodb/MongoDriver";
import { Counters } from "./Counters";

@Entity()
export class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column((type) => Counters)
    counters?: Counters;
}
