import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    identifier: number;

    @Column("simple-array")
    names: string[];
}
