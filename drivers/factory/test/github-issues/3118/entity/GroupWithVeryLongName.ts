import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    OneToMany,
} from "typeorm-core";

import { AuthorWithVeryLongName } from "./AuthorWithVeryLongName";

@Entity()
export class GroupWithVeryLongName {
    @PrimaryGeneratedColumn()
    groupId: number;

    @Column()
    name: string;

    @OneToMany(
        () => AuthorWithVeryLongName,
        (author) => author.groupWithVeryLongName
    )
    authorsWithVeryLongName: AuthorWithVeryLongName[];
}
