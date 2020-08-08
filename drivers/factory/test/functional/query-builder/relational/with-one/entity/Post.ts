import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from "typeorm-core";

import { Category } from "./Category";
import { Image } from "./Image";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne((type) => Category)
    category: Category;

    @OneToOne((type) => Image, (image) => image.post)
    @JoinColumn()
    image: Image;
}
