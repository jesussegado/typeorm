import { Entity, Column, ObjectIdColumn } from "typeorm-core";

import { ObjectID } from "typeorm-core/build/compiled/src/driver/mongodb/MongoDriver";

@Entity()
export class Post {
    @ObjectIdColumn()
    nonIdNameOfObjectId: ObjectID;

    @Column()
    title: string;
}
