import { Entity, Column, PrimaryColumn } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn("int")
    id: number;

    @Column()
    title: string;
}
