import {
    Entity,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    Column,
} from "typeorm-core";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    likesCount: number = 0;

    @DeleteDateColumn()
    deletedAt: Date;
}
