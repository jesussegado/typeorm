import { Entity } from "typeorm-core";
import {  ObjectIdColumn  } from "typeorm-core";
import { Column } from "typeorm-core";
import { Event } from "./Event";
import { ObjectID } from "typeorm-core/build/compiled/src/driver/mongodb/MongoDriver";

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
