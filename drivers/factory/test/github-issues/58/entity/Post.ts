import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { OneToMany  } from "typeorm-core";
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
