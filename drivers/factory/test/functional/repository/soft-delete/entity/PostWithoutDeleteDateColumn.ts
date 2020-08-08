import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
} from "typeorm-core";

@Entity()
export class PostWithoutDeleteDateColumn extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
