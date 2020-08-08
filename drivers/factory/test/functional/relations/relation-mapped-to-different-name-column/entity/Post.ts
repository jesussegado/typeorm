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
    id: number;

    @OneToOne((type) => PostDetails)
    @JoinColumn()
    details: PostDetails;

    @Column()
    title: string;
}
