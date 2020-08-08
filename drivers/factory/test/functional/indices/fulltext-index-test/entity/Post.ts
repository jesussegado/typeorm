import { Column, Entity, PrimaryGeneratedColumn } from "typeorm-core";
import {  Index  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ fulltext: true })
    @Column()
    default: string;

    @Index({ fulltext: true, parser: "ngram" })
    @Column()
    ngram: string;
}
