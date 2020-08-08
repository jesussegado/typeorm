import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";

@Entity()
export class TestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
