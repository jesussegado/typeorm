import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column({ select: false })
    authorName: string;
}
