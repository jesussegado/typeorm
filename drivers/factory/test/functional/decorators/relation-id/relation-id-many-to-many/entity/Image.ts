import { PrimaryColumn, Entity, Column } from "typeorm-core";

@Entity()
export class Image {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    isRemoved: boolean = false;
}
