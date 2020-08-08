import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm-core";

import { PostCategory } from "./PostCategory";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(
        (type) => PostCategory,
        (postCategoryRelation) => postCategoryRelation.post
    )
    categories: PostCategory[];
}
