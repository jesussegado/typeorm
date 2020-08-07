import { Entity } from "../../../../src/decorator/entity/Entity";
import { ObjectIdColumn } from "../../../../src/decorator/columns/ObjectIdColumn";
import { Column, ObjectID } from "../../../../src";

@Entity()
export class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    text: string;
}
