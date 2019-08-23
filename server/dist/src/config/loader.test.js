"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const loader_1 = require("./loader");
test("loads", () => {
    const config = loader_1.load("config", "dev");
    expect(config).not.toBeNull();
});
//# sourceMappingURL=loader.test.js.map