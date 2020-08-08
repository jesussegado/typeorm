import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: string;

    @Column()
    photo: string;
}
