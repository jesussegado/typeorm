import { Entity, Column, ObjectIdColumn } from "typeorm-core";

import { ObjectID } from 'typeorm-driver-mongodb';

@Entity()
export class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    index: number;

    // @Column(() => Counters)
    // counters: Counters;
}
