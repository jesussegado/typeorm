import { Column, PrimaryGeneratedColumn } from "typeorm-core";
import { Entity } from "typeorm-core";

@Entity("bar")
export class Bar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
}
