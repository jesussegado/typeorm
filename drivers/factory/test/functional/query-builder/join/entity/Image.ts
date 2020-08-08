import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    isRemoved: boolean = false;
}
