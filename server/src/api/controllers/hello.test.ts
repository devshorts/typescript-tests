test('controller', () => {
    const f: Foo = {
        doStuff: jest.fn(() => {
            console.log("called!")
        })
    };

    const _ = new Test(f);

    expect(f.doStuff).toHaveBeenCalled()
});

test('controller2', () => {
    const instance = new Foo2;

    jest.spyOn(instance, 'barStuff').mockImplementation(() => {
        console.log("barStuff called")
    });

    const _ = new Test2(instance);

    expect(instance.barStuff).toHaveBeenCalled()
});


class Foo {
    doStuff(): void {
    }
}

class Test {
    constructor(f: Foo) {
        f.doStuff()
    }
}

class Foo2 {
    doStuff(): void {
    }

    barStuff(): void {
    }
}

class Test2 {
    constructor(f: Foo2) {
        f.barStuff()
    }
}
