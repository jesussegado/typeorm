import { Entity, Column, ObjectIdColumn } from "typeorm-core";

import { ObjectID } from 'typeorm-driver-mongodb';
import { Counters } from "./Counters";

@Entity()
export class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column((type) => Counters)
    counters: Counters[];

    @Column()
    names: string[];

    @Column()
    numbers: number[];

    @Column()
    booleans: boolean[];

    @Column((type) => Counters)
    other1: Counters[];

    @Column((type) => Counters)
    other2: Counters[];
}
