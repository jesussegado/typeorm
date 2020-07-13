import { Entity, Column, PrimaryGeneratedColumn } from "../../../../src/index";
import { EmbeddedItem } from './EmbeddedItem';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    someText: string;

    @Column((type) => EmbeddedItem)
    embedded: EmbeddedItem;
}
