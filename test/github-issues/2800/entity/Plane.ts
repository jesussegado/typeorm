import { Vehicle } from "./Vehicle";
import { ChildEntity, Column } from "../../../../src";
import { PlaneEngine } from "./PlaneEngine";

@ChildEntity()
export class Plane extends Vehicle {
    @Column((type) => PlaneEngine, { prefix: "planeEngine" })
    public engine: PlaneEngine;
}
