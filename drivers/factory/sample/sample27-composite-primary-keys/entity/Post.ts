import {Column, Entity} from "typeorm-core/build/compiled/src/index";
import {PrimaryColumn} from "typeorm-core/build/compiled/src/decorator/columns/PrimaryColumn";

@Entity("sample27_composite_primary_keys")
export class Post {

    @PrimaryColumn("int")
    id: number;

    @PrimaryColumn()
    type: string;

    @Column()
    text: string;

}
