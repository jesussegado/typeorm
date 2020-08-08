import { Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm-core";

@Entity()
export class Foo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
