import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

import { BasePost } from "./BasePost";

@Entity()
export class Post extends BasePost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: false })
    active: boolean;
}
