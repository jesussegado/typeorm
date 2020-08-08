import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Author } from "./Author";
import { Abbreviation } from "./Abbreviation";
import { OneToOne  } from "typeorm-core";
import { JoinColumn  } from "typeorm-core";

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
