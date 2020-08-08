import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

import { TagTransformer } from "./TagTransformer";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: String, transformer: new TagTransformer() })
    tags: string[];
}
