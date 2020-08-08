import { Entity } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Column } from "typeorm-core";

@Entity("devices")
export class Device {
    @PrimaryColumn({
        name: "id",
        type: "char",
        length: "12",
    })
    id: string;

    @Column({
        name: "registration_token",
        type: "decimal",
        precision: 6,
        scale: 0,
    })
    registrationToken: string;
}
