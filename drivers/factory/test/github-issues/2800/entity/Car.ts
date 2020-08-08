import { ChildEntity, Column } from "typeorm-core";
import { Vehicle } from "./Vehicle";
import { CarEngine } from "./CarEngine";

@ChildEntity()
export class Car extends Vehicle {
    @Column((type) => CarEngine, { prefix: "carEngine" })
    public engine: CarEngine;
}
