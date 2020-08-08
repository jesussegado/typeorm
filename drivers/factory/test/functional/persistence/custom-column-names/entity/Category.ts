import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn,
} from "typeorm-core";

import { Post } from "./Post";

import { CategoryMetadata } from "./CategoryMetadata";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany((type) => Post, (post) => post.category)
    posts: Post[];

    @Column({ type: "int", nullable: true })
    metadataId: number;

    @OneToOne((type) => CategoryMetadata, (metadata) => metadata.category, {
        cascade: ["insert"],
    })
    @JoinColumn({ name: "metadataId" })
    metadata: CategoryMetadata;

    @Column()
    name: string;
}
