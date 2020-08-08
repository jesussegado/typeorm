import {
    Entity,
    Column,
    ObjectIdColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm-core";

import { ObjectID } from "typeorm-core/build/compiled/src/driver/mongodb/MongoDriver";

@Entity()
export class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    message: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}
