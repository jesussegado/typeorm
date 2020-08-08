import { Column, Entity, PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("hstore", { hstoreType: "object" })
    hstoreObj: Record<string, any>;

    @Column("hstore", { hstoreType: "string" })
    hstoreStr: string;
}
