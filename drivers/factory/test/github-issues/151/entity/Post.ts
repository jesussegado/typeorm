import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { Category } from "./Category";
import { JoinColumn  } from "typeorm-core";
import { OneToOne  } from "typeorm-core";
import { PostMetadata } from "./PostMetadata";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToOne((type) => Category, { cascade: true })
    @JoinColumn()
    category: Category | null;

    @OneToOne((type) => PostMetadata, (metadata) => metadata.post, {
        cascade: true,
    })
    @JoinColumn()
    metadata: PostMetadata | null;
}
