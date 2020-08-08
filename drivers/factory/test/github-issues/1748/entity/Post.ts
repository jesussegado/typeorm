import { Entity, PrimaryColumn, Column } from "typeorm-core";

import { UuidTransformer } from "./UuidTransformer";
import { Uuid } from "./Uuid";

@Entity()
export class Post {
    @PrimaryColumn({ type: "uuid", transformer: new UuidTransformer() })
    id: Uuid;

    @Column()
    title: string;

    constructor(id: Uuid) {
        this.id = id;
    }
}
