import { Column } from "typeorm-core";

export class EmbeddedInThing {
    @Column()
    public someSeriouslyLongFieldNameFirst: number;

    @Column()
    public someSeriouslyLongFieldNameSecond: number;
}
