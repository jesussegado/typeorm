import { Entity, ObjectIdColumn, Column } from "typeorm-core";

import { ObjectID } from 'typeorm-driver-mongodb';

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;
}
