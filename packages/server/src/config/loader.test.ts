import "reflect-metadata";
import {load} from "./loader";

test("loads", () => {
    const config = load("config", "dev");
    expect(config).not.toBeNull()
});
