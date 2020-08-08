import {  PrimaryColumn, OneToMany  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  BaseEntity  } from "typeorm-core";

import { RecordContext } from "./context";

@Entity({ name: "users" })
export class User extends BaseEntity {
    @PrimaryColumn()
    public id: string;

    @OneToMany((type) => RecordContext, (context) => context.user)
    public contexts: RecordContext[];
}
