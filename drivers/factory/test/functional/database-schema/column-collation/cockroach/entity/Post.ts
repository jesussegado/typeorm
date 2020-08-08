import { Entity, PrimaryColumn, Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @Column({ collation: "en_US" })
    name: string;
}
