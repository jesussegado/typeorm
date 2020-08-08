import {Column, Entity} from "typeorm-core/build/compiled/src/index";
import {PostCategory} from "./PostCategory";
import {ManyToMany} from "typeorm-core/build/compiled/src/decorator/relations/ManyToMany";
import {JoinTable} from "typeorm-core/build/compiled/src/decorator/relations/JoinTable";
import {BaseObject} from "./BaseObject";

@Entity("sample13_post")
export class Post extends BaseObject {

    @Column()
    text: string;

    @ManyToMany(type => PostCategory, category => category.posts, {
        cascade: true
    })
    @JoinTable()
    categories: PostCategory[] = [];

}
