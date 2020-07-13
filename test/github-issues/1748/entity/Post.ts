import { Entity } from "../../../../src/decorator/entity/Entity";
import { PrimaryColumn } from "../../../../src/decorator/columns/PrimaryColumn";
import { Column } from "../../../../src/decorator/columns/Column";
import { UuidTransformer } from './UuidTransformer';
import { Uuid } from './Uuid';

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
