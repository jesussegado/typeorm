import { Entity, ObjectIdColumn, Column } from "typeorm-core";
import { ObjectID } from "typeorm-core/build/compiled/src/driver/mongodb/MongoDriver";
import { Chapter } from "./Chapter";
@Entity()
export class Book {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column((type) => Chapter)
    chapters: Chapter[];
}
