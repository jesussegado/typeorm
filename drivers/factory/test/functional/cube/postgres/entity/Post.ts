import { PrimaryGeneratedColumn, Entity, Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("cube", {
        nullable: true,
    })
    mainColor: number[];

    @Column("cube", {
        nullable: true,
        array: true,
    })
    colors: number[][];
}
