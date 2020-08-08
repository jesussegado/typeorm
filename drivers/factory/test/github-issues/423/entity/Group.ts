import { Entity } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { Index} from "typeorm-core";

@Index("Groups name", ["name"], { unique: true })
@Entity("groups")
export class Group {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}
