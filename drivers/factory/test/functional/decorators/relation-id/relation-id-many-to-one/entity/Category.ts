import { PrimaryColumn, Entity, Column } from "typeorm-core";

@Entity()
export class Category {
    @PrimaryColumn()
    id: number;

    @Column({ unique: true })
    name: string;
}
