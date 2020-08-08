import { Entity } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { OneToOne  } from "typeorm-core";
import { JoinColumn  } from "typeorm-core";
import { Message } from "./Message";

@Entity()
export class Locale {
    @PrimaryColumn("varchar", { length: 5 })
    code: string;

    @Column("varchar", { length: 50 })
    englishName: string;

    @OneToOne(() => Message, { onDelete: "SET NULL" })
    @JoinColumn()
    name: Message;
}
