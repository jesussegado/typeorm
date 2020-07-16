import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    VersionColumn,
} from "../../../../src";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @VersionColumn()
    version: number;

    @Column({ type: "jsonb" })
    problems: object;
}
