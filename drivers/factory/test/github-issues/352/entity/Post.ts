import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn("double precision")
    id: number;

    @Column()
    title: string;
}
