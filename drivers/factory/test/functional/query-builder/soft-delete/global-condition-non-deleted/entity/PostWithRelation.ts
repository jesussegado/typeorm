import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import {  DeleteDateColumn  } from "typeorm-core";
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
