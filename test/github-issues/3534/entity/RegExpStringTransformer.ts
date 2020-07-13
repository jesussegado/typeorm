// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RegExpStringTransformer {
    export function to(value: RegExp): string {
        return value.toString();
    }

    export function from(value: string): RegExp {
        const match = value.match(/^\/(.*)\/(.*)$/);
        if (match) {
            const [, pattern, flags] = match;
            return new RegExp(pattern, flags);
        }
        throw new Error(`"${value}" is not a regular expression`);
    }
}
