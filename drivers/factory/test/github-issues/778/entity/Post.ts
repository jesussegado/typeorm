import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
