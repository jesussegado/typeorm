import { PrimaryColumn } from "../../../../src/decorator/columns/PrimaryColumn";
import { Entity } from "../../../../src/decorator/entity/Entity";

@Entity({ withoutRowid: true })
export class Book2 {
    @PrimaryColumn()
    ean: string;
}
