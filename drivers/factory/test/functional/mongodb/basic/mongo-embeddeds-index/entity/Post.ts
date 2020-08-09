import { Entity, Column, ObjectIdColumn, Index } from "typeorm-core";

import { ObjectID } from "typeorm-driver-mongodb";
import { Information } from "./Information";

@Entity()
@Index("info_description", ["info.description"])
export class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    name: string;

    @Column(() => Information)
    info: Information;
}
