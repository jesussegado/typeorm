import { Entity } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Column } from "typeorm-core";

@Entity("view", { synchronize: false })
export class View {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;
}
