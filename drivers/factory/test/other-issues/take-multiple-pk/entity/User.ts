import {
    Column,
    PrimaryColumn,
    Entity,
    JoinTable,
    ManyToMany,
} from "typeorm-core";

import { Role } from "./Role";

@Entity()
export class User {
    @PrimaryColumn() id: number;

    @PrimaryColumn() name: string;

    @Column() handedness: string;

    @ManyToMany((type) => Role, {
        cascade: ["insert"],
    })
    @JoinTable()
    roles: Role[];
}
