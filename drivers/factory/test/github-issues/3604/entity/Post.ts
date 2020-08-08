import {
    PrimaryGeneratedColumn,
    Entity,
    JoinColumn,
    ManyToOne,
} from "typeorm-core";

import { Author } from "./Author";

@Entity()
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne((type) => Author)
    @JoinColumn()
    author: Author;
}
