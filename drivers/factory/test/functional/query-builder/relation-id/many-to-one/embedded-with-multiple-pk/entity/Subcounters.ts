import { Column, PrimaryColumn, ManyToOne } from "typeorm-core";

import { User } from "./User";

export class Subcounters {
    @PrimaryColumn()
    version: number;

    @Column()
    watches: number;

    @ManyToOne((type) => User)
    watchedUser: User;

    watchedUserId: number;
}
