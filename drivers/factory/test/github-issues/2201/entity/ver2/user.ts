import { PrimaryColumn, OneToMany, Entity, BaseEntity } from "typeorm-core";

import { RecordContext } from "./context";

@Entity({ name: "users" })
export class User extends BaseEntity {
    @PrimaryColumn()
    public id: string;

    @OneToMany((type) => RecordContext, (context) => context.user)
    public contexts: RecordContext[];
}
