import { PrimaryColumn, Entity, BaseEntity, Column } from "typeorm-core";

@Entity()
export class Category extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}
