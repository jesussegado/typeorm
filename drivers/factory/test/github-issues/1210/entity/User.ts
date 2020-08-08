import { Entity, ObjectIdColumn, Column } from "typeorm-core";

import { ObjectID } from "typeorm-core/build/compiled/src/driver/mongodb/MongoDriver";
import { Event } from "./Event";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column((type) => Event)
    events: Event[];
}
