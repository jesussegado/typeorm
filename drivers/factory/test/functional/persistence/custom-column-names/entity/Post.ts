import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("int", { nullable: true })
    categoryId: number;

    @ManyToOne((type) => Category, (category) => category.posts, {
        cascade: true,
    })
    @JoinColumn({ name: "categoryId" })
    category: Category;
}
