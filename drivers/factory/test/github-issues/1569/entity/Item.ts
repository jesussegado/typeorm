import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";
import { EmbeddedItem } from "./EmbeddedItem";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    someText: string;

    @Column((type) => EmbeddedItem)
    embedded: EmbeddedItem;
}
