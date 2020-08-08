import {Column} from "typeorm-core/build/compiled/src/index";

export class Counters {

    @Column()
    raiting: number;

    @Column()
    stars: number;

    @Column()
    commentCount: number;

    @Column()
    metadata: string;

}
