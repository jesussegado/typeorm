import { Column } from "../../../../src";

export class EmbeddedInThing {
    @Column()
    public someSeriouslyLongFieldNameFirst: number;

    @Column()
    public someSeriouslyLongFieldNameSecond: number;
}
