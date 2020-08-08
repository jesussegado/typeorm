import {
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
