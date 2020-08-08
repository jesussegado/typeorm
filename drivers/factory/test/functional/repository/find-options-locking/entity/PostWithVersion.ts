import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    VersionColumn,
} from "typeorm-core";

@Entity()
export class PostWithVersion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @VersionColumn()
    version: number;
}
