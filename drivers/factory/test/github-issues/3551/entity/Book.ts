import { Chapter } from "./Chapter";
import { ObjectID, Entity, ObjectIdColumn, Column } from "typeorm-core";

@Entity()
export class Book {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column((type) => Chapter)
    chapters: Chapter[];
}
