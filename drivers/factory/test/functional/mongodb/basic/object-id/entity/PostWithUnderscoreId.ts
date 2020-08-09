import { Entity, Column, ObjectIdColumn } from "typeorm-core";

import { ObjectID } from "typeorm-driver-mongodb";

@Entity()
export class PostWithUnderscoreId {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    title: string;
}
