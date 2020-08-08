import {  ValueTransformer  } from "typeorm-core";
import { Uuid } from "./Uuid";

export class UuidTransformer implements ValueTransformer {
    to(value: Uuid): string {
        return value.getValue();
    }

    from(value: string): Uuid {
        return new Uuid(value);
    }
}
