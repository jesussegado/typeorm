import { Column } from "typeorm-core";

export class EmbeddedItem {
    @Column({ type: "integer", array: true })
    arrayInsideEmbedded: number[];
}
