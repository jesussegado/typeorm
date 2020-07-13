import { Engine } from "./Engine";
import { Column } from "../../../../src";

export class PlaneEngine extends Engine {
    @Column()
    public beep: number;


    @Column()
    public boop: number;
}
