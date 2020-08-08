import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from "typeorm-core";

import { Author } from "./Author";
import { Abbreviation } from "./Abbreviation";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne((type) => Author)
    @JoinColumn({ name: "author_id" })
    author: Author;

    @OneToOne((type) => Abbreviation)
    @JoinColumn({ name: "abbreviation_id" })
    abbreviation: Abbreviation;
}
