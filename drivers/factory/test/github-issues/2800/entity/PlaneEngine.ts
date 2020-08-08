import { Column } from "typeorm-core";
import { Engine } from "./Engine";

export class PlaneEngine extends Engine {
    @Column()
    public beep: number;

    @Column()
    public boop: number;
}
