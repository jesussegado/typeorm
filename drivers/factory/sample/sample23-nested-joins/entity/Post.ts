import {Column, Entity, PrimaryGeneratedColumn} from "typeorm-core/build/compiled/src/index";
import {Category} from "./Category";
import {Author} from "./Author";
import {ManyToMany} from "typeorm-core/build/compiled/src/decorator/relations/ManyToMany";
import {JoinTable} from "typeorm-core/build/compiled/src/decorator/relations/JoinTable";
import {ManyToOne} from "typeorm-core/build/compiled/src/decorator/relations/ManyToOne";

@Entity("sample23_post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToMany(type => Category, {
        cascade: true
    })
    @JoinTable()
    categories: Category[];

    @ManyToOne(type => Author, { cascade: ["insert"] })
    author: Author|null;

}
