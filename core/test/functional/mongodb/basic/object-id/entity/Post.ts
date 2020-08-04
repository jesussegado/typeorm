import { Entity } from "../../../../../../src/decorator/entity/Entity";
import { Column } from "../../../../../../src/decorator/columns/Column";
import { ObjectIdColumn } from "../../../../../../src/decorator/columns/ObjectIdColumn";
import { ObjectID } from '../../../../../../src';

@Entity()
export class Post {
    @ObjectIdColumn()
    nonIdNameOfObjectId: ObjectID;

    @Column()
    title: string;
}
