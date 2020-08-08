import { PrimaryColumn } from "typeorm-core";
import { Entity } from "typeorm-core";

@Entity()
export class Book {
    @PrimaryColumn()
    ean: string;
}
