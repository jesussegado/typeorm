import { Entity, Column, PrimaryColumn } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;
}
