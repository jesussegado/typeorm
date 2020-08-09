import { Entity, ObjectIdColumn, Column, UpdateDateColumn } from "typeorm-core";

import { ObjectID } from "typeorm-driver-mongodb";
@Entity()
export class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    active: boolean = false;

    @UpdateDateColumn()
    updateDate: Date;

    @Column()
    updatedColumns: number | string[] = 0;

    loaded: boolean = false;
}
