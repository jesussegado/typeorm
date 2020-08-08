import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { ManyToMany } from "typeorm-core";
import { TileEntity } from "./TileEntity";

@Entity("activity")
export class ActivityEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: string;

    @Column({ type: "datetime" })
    endDate: Date;

    @ManyToMany((type) => TileEntity, (tile) => tile.activities, {
        cascade: true,
    })
    tiles: TileEntity[];
}
