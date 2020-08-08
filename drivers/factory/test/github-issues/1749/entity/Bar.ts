import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";

@Entity("bar", { schema: "foo" })
export class Bar {
    @PrimaryGeneratedColumn()
    id: string;
}
