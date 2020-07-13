
export class Uuid {
    private value: string;

    constructor(value: string) {
        if (!/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(
            value
        )) {
            throw new Error("Invalid UUID format");
        }

        this.value = value;
    }


    public getValue(): string {
        return this.value;
    }
}
