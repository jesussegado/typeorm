import {Column, Entity, PrimaryGeneratedColumn} from "typeorm-core/build/compiled/src/index";
import {Author} from "./Author";
import {Category} from "./Category";
import {ManyToMany} from "typeorm-core/build/compiled/src/decorator/relations/ManyToMany";
import {JoinTable} from "typeorm-core/build/compiled/src/decorator/relations/JoinTable";

@Entity("sample20_post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column("int")
    authorId: number;

    @ManyToMany(type => Category)
    @JoinTable()
    categories: Category[];

    superCategories: Category[];

    author: Author;

}
