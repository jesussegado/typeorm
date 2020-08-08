import {
    Entity,
    Column,
    Unique,
    PrimaryColumn,
    Check,
    Exclusion,
} from "typeorm-core";

@Entity()
@Unique(["text", "tag"])
@Exclusion(`USING gist ("text" WITH =)`)
@Check(`"likesCount" < 1000`)
export class Post {
    @PrimaryColumn()
    id: number;

    @Column({ unique: true })
    version: string;

    @Column({ default: "My post" })
    name: string;

    @Column()
    text: string;

    @Column()
    tag: string;

    @Column()
    likesCount: number;
}
