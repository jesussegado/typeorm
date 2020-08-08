import {Column, Entity} from "typeorm-core/build/compiled/src/index";
import {PrimaryColumn} from "typeorm-core/build/compiled/src/decorator/columns/PrimaryColumn";
import {Generated} from "typeorm-core/build/compiled/src/decorator/Generated";

@Entity("sample01_post")
export class Post {

    @PrimaryColumn("integer")
    @Generated()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column({ nullable: false })
    likesCount: number;

}
