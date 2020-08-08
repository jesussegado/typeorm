import { PrimaryColumn, Entity } from "typeorm-core";

@Entity({ withoutRowid: true })
export class Book2 {
    @PrimaryColumn()
    ean: string;
}
