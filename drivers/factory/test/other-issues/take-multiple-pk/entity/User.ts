import { Column } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Entity } from "typeorm-core";
import { JoinTable } from "typeorm-core";
import { ManyToMany } from "typeorm-core";
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
