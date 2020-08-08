import { JoinTable, Entity, ManyToMany } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { PostWithVeryLongName } from "./PostWithVeryLongName";

@Entity()
export class CategoryWithVeryLongName {
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column({ default: "dummy name" })
    name: string;

    @ManyToMany(() => PostWithVeryLongName, (post) => post.categories)
    @JoinTable()
    postsWithVeryLongName: PostWithVeryLongName[];
}
