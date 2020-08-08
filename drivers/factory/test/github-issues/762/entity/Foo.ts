import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

import { FooMetadata } from "./FooMetadata";

@Entity()
export class Foo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column((type) => FooMetadata)
    metadata?: FooMetadata;
}
