import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm-core/build/compiled/src/index";
import {PostCategory} from "./PostCategory";
import {PostAuthor} from "./PostAuthor";
import {ManyToOne} from "typeorm-core/build/compiled/src/decorator/relations/ManyToOne";
import {JoinTable} from "typeorm-core/build/compiled/src/decorator/relations/JoinTable";

@Entity("sample5_post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(type => PostAuthor, post => post.posts, {
        cascade: true
    })
    author: PostAuthor;

    @ManyToMany(type => PostCategory, category => category.posts, {
        cascade: true
    })
    @JoinTable()
    categories: PostCategory[] = [];

}
