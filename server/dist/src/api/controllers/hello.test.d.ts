declare class Foo {
    doStuff(): void;
}
declare class Test {
    constructor(f: Foo);
}
declare class Foo2 {
    doStuff(): void;
    barStuff(): void;
}
declare class Test2 {
    constructor(f: Foo2);
}
