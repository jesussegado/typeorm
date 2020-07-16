import { Column, Entity, PrimaryGeneratedColumn } from "../../../../../src";

@Entity()
export class FeatureWithoutSRID {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "geometry" })
    shape: string;
}
