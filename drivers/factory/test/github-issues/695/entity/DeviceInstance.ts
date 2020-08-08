import { Entity } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { ManyToOne  } from "typeorm-core";
import { JoinColumn  } from "typeorm-core";
import { Column } from "typeorm-core";
import { Device } from "./Device";

@Entity("device_instances")
export class DeviceInstance {
    @PrimaryColumn({ name: "id", type: "char", length: "36" })
    id: string;

    @ManyToOne((type) => Device, { nullable: false })
    @JoinColumn({ name: "device_id", referencedColumnName: "id" })
    device: Device;

    @Column({ name: "instance", type: "smallint" })
    instance: number;

    @Column({ name: "type", type: "varchar", length: "30" })
    type: string;
}
