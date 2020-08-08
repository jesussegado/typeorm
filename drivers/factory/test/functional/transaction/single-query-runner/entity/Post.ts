import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    constructor(id?: number, title?: string) {
        if (id) this.id = id;
        if (title) this.title = title;
    }
}
