import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    date: Date;

    // @Column({ localTimezone: true })
    // localDate: Date;
}
