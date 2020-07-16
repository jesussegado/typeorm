import {
    PrimaryGeneratedColumn,
    Entity,
    JoinColumn,
    ManyToOne,
} from "../../../../src";

import { Author } from "./Author";

@Entity()
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne((type) => Author)
    @JoinColumn()
    author: Author;
}
