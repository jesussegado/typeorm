import { Column } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Entity } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @Column({
        type: "json",
    })
    data: any;
}
