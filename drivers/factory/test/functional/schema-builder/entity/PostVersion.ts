import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { ManyToOne  } from "typeorm-core";
import { JoinColumn } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Post } from "./Post";

@Entity()
export class PostVersion {
    @PrimaryColumn()
    id: number;

    @ManyToOne((type) => Post)
    @JoinColumn({ referencedColumnName: "version" })
    post: Post;

    @Column()
    details: string;
}
