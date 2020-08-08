import { Entity, PrimaryColumn, Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @Column({
        type: "json",
        default: { hello: "world" },
    })
    json: any;
}
