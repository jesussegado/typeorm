import { ValueTransformer } from "../../../../src/decorator/options/ValueTransformer";
import { Uuid } from "./Uuid";

export class UuidTransformer implements ValueTransformer {
    to(value: Uuid): string {
        return value.getValue();
    }

    from(value: string): Uuid {
        return new Uuid(value);
    }
}
