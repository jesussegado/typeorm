import { Entity, PrimaryColumn, Column } from "typeorm-core";

@Entity("test_entity")
export class TestEntity {
    @PrimaryColumn()
    id1: string;

    @PrimaryColumn()
    id2: string;

    @Column()
    name: string;
}
