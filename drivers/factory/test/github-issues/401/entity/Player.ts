import { Entity } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { ManyToOne  } from "typeorm-core";
import { Group } from "./Group";

@Entity()
export class Player {
    @PrimaryColumn()
    email: string;

    @ManyToOne((type) => Group)
    group: Group;
}
