import { Column, Entity, PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class FeatureWithSRID {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "geometry", srid: 2326 })
    shape: string;
}
