import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class LetterBox {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "point", srid: 4326 })
    coord: string;
}
