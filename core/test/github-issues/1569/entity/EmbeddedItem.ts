import { Column } from "../../../../src/index";

export class EmbeddedItem {
    @Column({ type: "integer", array: true })
    arrayInsideEmbedded: number[];
}
