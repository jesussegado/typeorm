import { PrimaryColumn, Entity } from "typeorm-core";

@Entity()
export class Book {
    @PrimaryColumn()
    ean: string;
}
