import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm-core";

@Entity()
export class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    text: string;
}
