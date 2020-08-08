import { Column } from "typeorm-core";
import { Entity } from "typeorm-core";
import { RegExpStringTransformer } from "./RegExpStringTransformer";
import { PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class Foo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String, transformer: RegExpStringTransformer })
    bar: RegExp;
}
