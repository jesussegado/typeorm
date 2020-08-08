import { Entity, ObjectIdColumn, Column } from "typeorm-core";

import { ObjectID } from "typeorm-core/build/compiled/src/driver/mongodb/MongoDriver";

@Entity()
export class Event {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column({ name: "at_date", default: Date.now })
    date: Date;

    // @Column( type => User)
    // participants: User[]
}
