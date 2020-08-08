import { Column, Entity, PrimaryGeneratedColumn } from "typeorm-core";
import { EmbeddedInThing } from "./EmbeddedInThing";

@Entity()
export class Thing {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column((type) => EmbeddedInThing)
    public embeddedThing: EmbeddedInThing;
}
