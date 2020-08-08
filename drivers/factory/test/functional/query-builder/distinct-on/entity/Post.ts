import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    moderator: string;
}
