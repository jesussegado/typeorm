import {Column, Entity} from "typeorm-core/build/compiled/src/index";
import {ManyToMany} from "typeorm-core/build/compiled/src/decorator/relations/ManyToMany";
import {PostCategory} from "./PostCategory";
import {JoinTable} from "typeorm-core/build/compiled/src/decorator/relations/JoinTable";
import {BaseObject} from "./BaseObject";

@Entity("sample13_blog")
export class Blog extends BaseObject {

    @Column()
    text: string;

    @ManyToMany(type => PostCategory, category => category.posts, {
        cascade: true
    })
    @JoinTable()
    categories: PostCategory[] = [];

}
