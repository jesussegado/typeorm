import { Entity, ObjectIdColumn, Column } from "typeorm-core";
import { ObjectID } from 'typeorm-driver-mongodb';
@Entity()
export class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    text: string;
}
