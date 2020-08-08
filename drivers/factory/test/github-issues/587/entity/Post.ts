import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { Index} from "typeorm-core";
import { ManyToOne  } from "typeorm-core";
import { Tag } from "./Tag";

@Index(["a", "b", "c", "tag"])
@Index(["b", "tag", "c"])
@Index(["c", "a"])
@Entity("Posts")
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    a: string;

    @Column()
    b: string;

    @Column()
    c: string;

    @ManyToOne(() => Tag)
    tag: Tag;
}
