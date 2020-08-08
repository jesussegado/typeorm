import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ObjectIdColumn  } from "typeorm-core";
import {  Index  } from "typeorm-core";
import { Information } from "./Information";
import { ObjectID } from "typeorm-core/build/compiled/src/driver/mongodb/MongoDriver";

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
