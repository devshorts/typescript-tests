import {load} from "./loader";

test("loads", () => {
    const config = load("dev");
    expect(config).not.toBeNull()
});
