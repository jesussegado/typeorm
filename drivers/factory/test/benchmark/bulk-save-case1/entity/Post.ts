import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: "text" })
    text: string;

    @Column({ type: "int" })
    likesCount: number;

    @Column({ type: "int" })
    commentsCount: number;

    @Column({ type: "int" })
    watchesCount: number;
}
