import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { JoinTable } from "typeorm-core";
import { ManyToMany } from "typeorm-core";
import { Author } from "./Author";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Author)
    @JoinTable()
    authors: Author[];
}
