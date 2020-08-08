import {
    UpdateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;
}
