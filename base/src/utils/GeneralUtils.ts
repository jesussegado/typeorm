export function assertUnreachable(x: never): never {
    throw new Error("Didn't expect to get here");
}

export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
