import {Column, Entity, PrimaryGeneratedColumn} from "typeorm-core/build/compiled/src/index";
import {Author} from "./Author";
import {ManyToOne} from "typeorm-core/build/compiled/src/decorator/relations/ManyToOne";
import {Category} from "./Category";
import {ManyToMany} from "typeorm-core/build/compiled/src/decorator/relations/ManyToMany";
import {JoinTable} from "typeorm-core/build/compiled/src/decorator/relations/JoinTable";
import {OneToOne} from "typeorm-core/build/compiled/src/decorator/relations/OneToOne";
import {JoinColumn} from "typeorm-core/build/compiled/src/decorator/relations/JoinColumn";
import {PostMetadata} from "./PostMetadata";

@Entity("sample19_post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(type => Author, { cascade: true })
    author: Author;

    @ManyToMany(type => Category, { cascade: true })
    @JoinTable()
    categories: Category[];

    @OneToOne(type => PostMetadata, { cascade: true })
    @JoinColumn()
    metadata: PostMetadata;

}
