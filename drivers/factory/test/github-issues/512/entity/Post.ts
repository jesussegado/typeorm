import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity("Posts")
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("date")
    date: string;
}
