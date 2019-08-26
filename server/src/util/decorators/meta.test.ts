import "reflect-metadata";
import {Name} from "./meta";

@Name("my name!")
class Foo {

}

test('metadata', () => {
    expect(Reflect.getMetadata("name:value", Foo)).toEqual("my name!")
});
