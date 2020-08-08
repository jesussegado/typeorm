import { Column } from "typeorm-core";
import { Entity } from "typeorm-core";
import { Index} from "typeorm-core";

@Entity()
export class Foo {
    @Column("date")
    @Index({ expireAfterSeconds: 0 })
    expireAt: Date;
}
