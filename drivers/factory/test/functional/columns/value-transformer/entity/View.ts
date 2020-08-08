import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class View {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ transformer: [] })
    title: string;
}
