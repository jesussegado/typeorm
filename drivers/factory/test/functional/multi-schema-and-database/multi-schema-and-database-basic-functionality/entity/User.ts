import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

@Entity({ schema: "userSchema" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
