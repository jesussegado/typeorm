import { ObjectID, Entity, ObjectIdColumn, Column } from "typeorm-core";

@Entity()
export class Item {
    @ObjectIdColumn()
    public _id: ObjectID;

    /**
     * @deprecated use contacts instead
     */
    @Column()
    public contact?: string;

    @Column({ array: true })
    public contacts: Array<string>;

    @Column({ type: "json" })
    config: any;
}
