import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

import { Counters } from "./Counters";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column((type) => Counters)
    counters: Counters;
}
