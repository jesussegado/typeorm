import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

@Entity({
    database: "yoman",
})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
