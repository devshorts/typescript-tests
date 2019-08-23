export declare const traceID: () => string;
export declare function withNewTrace<T>(fun: () => T, trace?: string): T;
