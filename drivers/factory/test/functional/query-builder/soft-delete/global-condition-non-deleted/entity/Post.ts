import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
} from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
