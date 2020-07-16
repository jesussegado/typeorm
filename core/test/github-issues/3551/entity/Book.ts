import { Entity, ObjectIdColumn, Column, ObjectID } from "../../../../src";
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
