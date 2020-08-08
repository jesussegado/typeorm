import {Column, Entity, PrimaryGeneratedColumn} from "typeorm-core/build/compiled/src/index";
import {OneToMany} from "typeorm-core/build/compiled/src/decorator/relations/OneToMany";
import {Post} from "./Post";

@Entity("sample25_author")
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Post, author => author.author)
    posts: Post[];

}
