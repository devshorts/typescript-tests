"use strict";
test('controller', () => {
    const f = {
        doStuff: jest.fn(() => {
            console.log("called!");
        })
    };
    const _ = new Test(f);
    expect(f.doStuff).toHaveBeenCalled();
});
test('controller2', () => {
    const instance = new Foo2;
    jest.spyOn(instance, 'barStuff').mockImplementation(() => {
        console.log("barStuff called");
    });
    const _ = new Test2(instance);
    expect(instance.barStuff).toHaveBeenCalled();
});
class Foo {
    doStuff() {
    }
}
class Test {
    constructor(f) {
        f.doStuff();
    }
}
class Foo2 {
    doStuff() {
    }
    barStuff() {
    }
}
class Test2 {
    constructor(f) {
        f.barStuff();
    }
}
//# sourceMappingURL=hello.test.js.map