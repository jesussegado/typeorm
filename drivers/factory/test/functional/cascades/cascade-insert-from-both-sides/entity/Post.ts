import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from "typeorm-core";

import { PostDetails } from "./PostDetails";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    key: number;

    @OneToOne((type) => PostDetails, (details) => details.post, {
        cascade: ["insert"],
    })
    @JoinColumn()
    details: PostDetails;

    @Column()
    title: string;
}
