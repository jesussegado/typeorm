import { Entity, ObjectIdColumn, Column } from "typeorm-core";

import { ObjectID } from "typeorm-core/build/compiled/src/driver/mongodb/MongoDriver";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;
}
