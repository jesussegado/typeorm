import { Column } from "typeorm-core";
import { Engine } from "./Engine";

export class CarEngine extends Engine {
    @Column()
    public horsePower: number;

    @Column()
    public torque: number;
}
