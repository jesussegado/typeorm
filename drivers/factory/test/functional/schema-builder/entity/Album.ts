import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";

@Entity({ synchronize: false })
export class Album {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}
