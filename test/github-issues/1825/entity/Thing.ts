import { Column, Entity, PrimaryGeneratedColumn } from "../../../../src";
import { EmbeddedInThing } from './EmbeddedInThing';

@Entity()
export class Thing {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column((type) => EmbeddedInThing)
    public embeddedThing: EmbeddedInThing;
}
