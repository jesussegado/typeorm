import { Column, PrimaryColumn, Entity } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    inserted: boolean = false;

    updated: boolean = false;
}
