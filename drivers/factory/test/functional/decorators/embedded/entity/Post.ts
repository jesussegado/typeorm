import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

import { Counters } from "./Counters";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column(() => Counters)
    counters: Counters;
}
