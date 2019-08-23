"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const core_1 = require("@overnightjs/core");
const expressAsyncHandler = require("express-async-handler");
const http_status_codes_1 = require("http-status-codes");
const bank_service_1 = require("../../services/bank_service");
let HelloController = class HelloController {
    constructor(bank) {
        this.bank = bank;
    }
    async index(req, res) {
        // tslint:disable-next-line:ban
        const result = await this.bank.getAccount(parseInt(req.params.id, 10));
        return res.status(http_status_codes_1.OK).json(result);
    }
};
tslib_1.__decorate([
    core_1.Get("bank/:id"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], HelloController.prototype, "index", null);
HelloController = tslib_1.__decorate([
    inversify_1.injectable(),
    core_1.Controller("hello"),
    core_1.ClassWrapper(expressAsyncHandler),
    tslib_1.__metadata("design:paramtypes", [bank_service_1.HttpBin])
], HelloController);
exports.HelloController = HelloController;
//# sourceMappingURL=hello.js.map