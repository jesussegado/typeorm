import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToOne,
    JoinColumn,
} from "typeorm-core";

import { Foo } from "./Foo";

@Entity()
export class Bar extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne((type) => Foo, {
        onDelete: "SET NULL",
    })
    @JoinColumn()
    foo: Foo;
}
