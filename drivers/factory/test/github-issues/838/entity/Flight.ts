import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Flight {
    constructor(id: number, date: Date) {
        this.id = id;
        this.date = date;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("timestamp with time zone")
    date: Date;
}
