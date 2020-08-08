import {
    BaseEntity,
    Column,
    ManyToMany,
    PrimaryGeneratedColumn,
    Entity,
} from "typeorm-core";

import { Foo } from "./Foo";

@Entity()
export class Bar extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column() description: string;

    @ManyToMany((type) => Foo, (foo) => foo.bars)
    foos?: Foo[];
}
