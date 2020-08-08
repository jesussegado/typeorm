import {Column} from "typeorm-core/build/compiled/src/index";
import {BasePost} from "./BasePost";
import {PostAuthor} from "./PostAuthor";
import {ManyToOne} from "typeorm-core/build/compiled/src/decorator/relations/ManyToOne";
import {PrimaryColumn} from "typeorm-core/build/compiled/src/decorator/columns/PrimaryColumn";
import {Generated} from "typeorm-core/build/compiled/src/decorator/Generated";

export class BaseObject extends BasePost {

    @PrimaryColumn("double")
    @Generated()
    id: number;

    @Column()
    title: string;

    @ManyToOne(type => PostAuthor, post => post.posts, {
        cascade: true
    })
    author: PostAuthor;

}
