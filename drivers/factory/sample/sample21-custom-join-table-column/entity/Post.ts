import {Column, Entity, PrimaryGeneratedColumn} from "typeorm-core/build/compiled/src/index";
import {Author} from "./Author";
import {ManyToOne} from "typeorm-core/build/compiled/src/decorator/relations/ManyToOne";
import {Category} from "./Category";
import {ManyToMany} from "typeorm-core/build/compiled/src/decorator/relations/ManyToMany";
import {JoinTable} from "typeorm-core/build/compiled/src/decorator/relations/JoinTable";
import {JoinColumn} from "typeorm-core/build/compiled/src/decorator/relations/JoinColumn";

@Entity("sample21_post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(type => Author, author => author.posts, {
        cascade: true
    })
    @JoinColumn({ // todo: not yet fixed
        name: "user"
    })
    author: Author;

    @ManyToMany(type => Category, category => category.posts, {
        cascade: true
    })
    @JoinTable({
        name: "_post_categories"
    })
    categories: Category[];

}
