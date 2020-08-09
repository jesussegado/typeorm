import {Column, Entity} from "typeorm-core/build/compiled/src/index";
import {ObjectIdColumn} from "typeorm-core/build/compiled/src/decorator/columns/ObjectIdColumn";
import { ObjectID } from 'typeorm-driver-mongodb';
@Entity("sample34_post")
export class Post {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column("int", {
        nullable: false
    })
    likesCount: number;

}
