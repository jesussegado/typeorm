import { Entity, PrimaryColumn, Column, Index } from "typeorm-core";

@Index("Groups name", ["name"], { unique: true })
@Entity("groups")
export class Group {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}
