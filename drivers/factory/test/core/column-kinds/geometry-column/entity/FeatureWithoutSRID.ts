import { Column, Entity, PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class FeatureWithoutSRID {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "geometry" })
    shape: string;
}
