import { Column, Entity, PrimaryGeneratedColumn } from "../../../../src/index";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("hstore", { hstoreType: "object" })
    hstoreObj: Record<string, any>;

    @Column("hstore", { hstoreType: "string" })
    hstoreStr: string;
}
