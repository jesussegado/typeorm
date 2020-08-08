import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
