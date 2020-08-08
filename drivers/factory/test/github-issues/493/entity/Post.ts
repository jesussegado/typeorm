import { Entity, Column, PrimaryColumn } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;
}
