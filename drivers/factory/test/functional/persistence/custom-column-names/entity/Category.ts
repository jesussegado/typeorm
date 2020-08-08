import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { Post } from "./Post";
import {  Column  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
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
