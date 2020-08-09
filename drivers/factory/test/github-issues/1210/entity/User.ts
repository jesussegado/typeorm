import { Entity, ObjectIdColumn, Column } from "typeorm-core";

import { ObjectID } from "typeorm-driver-mongodb";
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
