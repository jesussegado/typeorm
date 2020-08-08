import { PrimaryColumn, Entity, Column } from "typeorm-core";

import { Counters } from "./Counters";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column(() => Counters)
    counters: Counters;
}
