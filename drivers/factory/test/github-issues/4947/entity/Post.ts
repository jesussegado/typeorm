import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title?: string;

    @Column()
    colToUpdate: number = 0;
}
