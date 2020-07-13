import { ValueTransformer } from "../../../../../src/decorator/options/ValueTransformer";

export class TagTransformer implements ValueTransformer {
    to(value: string[]): string {
        return value.join(", ");
    }

    from(value: string): string[] {
        return value.split(", ");
    }
}
