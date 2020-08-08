import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    DeleteDateColumn,
} from "typeorm-core";

import { CategoryWithRelation } from "./CategoryWithRelation";

@Entity()
export class PostWithRelation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToOne((type) => CategoryWithRelation, (category) => category.post, {
        eager: true,
    })
    @JoinColumn()
    category: CategoryWithRelation;

    @DeleteDateColumn()
    deletedAt: Date;
}
