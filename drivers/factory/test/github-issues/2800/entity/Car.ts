import { Vehicle } from "./Vehicle";
import { ChildEntity, Column } from "typeorm-core";
import { CarEngine } from "./CarEngine";

@ChildEntity()
export class Car extends Vehicle {
    @Column((type) => CarEngine, { prefix: "carEngine" })
    public engine: CarEngine;
}
