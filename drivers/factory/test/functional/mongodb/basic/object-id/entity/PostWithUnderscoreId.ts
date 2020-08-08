import { Entity, Column, ObjectIdColumn } from "typeorm-core";

import { ObjectID } from "typeorm-core/build/compiled/src/driver/mongodb/MongoDriver";

@Entity()
export class PostWithUnderscoreId {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    title: string;
}
