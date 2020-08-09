import { Entity, Column, ObjectIdColumn } from "typeorm-core";

import { ObjectID } from 'typeorm-driver-mongodb';

@Entity()
export class Post {
    @ObjectIdColumn()
    nonIdNameOfObjectId: ObjectID;

    @Column()
    title: string;
}
