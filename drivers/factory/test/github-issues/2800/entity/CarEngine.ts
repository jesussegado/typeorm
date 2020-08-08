import { Engine } from "./Engine";
import { Column } from "typeorm-core";

export class CarEngine extends Engine {
    @Column()
    public horsePower: number;

    @Column()
    public torque: number;
}
