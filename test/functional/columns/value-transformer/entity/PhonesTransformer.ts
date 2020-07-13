import { ValueTransformer } from "../../../../../src/decorator/options/ValueTransformer";

export class PhonesTransformer implements ValueTransformer {
    to(value: Map<string, number>): string {
        return JSON.stringify([...value]);
    }

    from(value: string): Map<string, number> {
        return new Map(JSON.parse(value));
    }
}
