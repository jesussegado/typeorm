import { PrimaryGeneratedColumn } from "typeorm-core";
import { AuthorWithVeryLongName } from "./AuthorWithVeryLongName";
import { ManyToMany, Entity, ManyToOne, Column } from "typeorm-core";
import { CategoryWithVeryLongName } from "./CategoryWithVeryLongName";

@Entity()
export class PostWithVeryLongName {
    @PrimaryGeneratedColumn()
    postId: number;

    @Column({ default: "dummy name" })
    name: string;

    @ManyToOne(
        () => AuthorWithVeryLongName,
        (author) => author.postsWithVeryLongName
    )
    authorWithVeryLongName: AuthorWithVeryLongName;

    @ManyToMany(
        () => CategoryWithVeryLongName,
        (category) => category.postsWithVeryLongName
    )
    categories: CategoryWithVeryLongName[];
}
