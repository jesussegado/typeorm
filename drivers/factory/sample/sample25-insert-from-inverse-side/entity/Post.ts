import {Column, Entity, PrimaryGeneratedColumn} from "typeorm-core/build/compiled/src/index";
import {Author} from "./Author";
import {ManyToOne} from "typeorm-core/build/compiled/src/decorator/relations/ManyToOne";

@Entity("sample25_post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(type => Author, author => author.posts)
    author: Author;

}
