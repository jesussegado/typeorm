import { PrimaryColumn, Column, Entity } from "../../../../src";

@Entity()
export class Category {
    @PrimaryColumn()
    public id!: number;

    @Column()
    public myField!: number;
}
