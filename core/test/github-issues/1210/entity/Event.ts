import { Entity } from "../../../../src/decorator/entity/Entity";
import { ObjectIdColumn } from "../../../../src/decorator/columns/ObjectIdColumn";
import { Column } from "../../../../src/decorator/columns/Column";
import { ObjectID } from '../../../../src';

@Entity()
export class Event {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column({ name: "at_date", default: Date.now })
    date: Date;

    // @Column( type => User)
    // participants: User[]
}
