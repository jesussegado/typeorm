import { Entity } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { OneToMany  } from "typeorm-core";

import { Detail } from "./detail";

@Entity()
export class Master {
    @PrimaryColumn({
        length: 20,
    })
    id: string;

    @Column({
        nullable: false,
        length: 150,
    })
    description: string;

    @OneToMany((type) => Detail, (detail) => detail.master)
    details: Detail[];
}
