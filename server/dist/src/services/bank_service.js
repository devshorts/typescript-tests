"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const request = require("request-promise-native");
const pubsub_1 = require("../queue/pubsub");
class Slideshow {
}
exports.Slideshow = Slideshow;
class Root {
}
exports.Root = Root;
let HttpBin = class HttpBin {
    constructor(publisher, config) {
        this.publisher = publisher;
        this.config = config;
    }
    async getAccount(id) {
        const data = await request.get(this.config.http_bin);
        const result = JSON.parse(data);
        if (result.slideshow === undefined) {
            throw new Error("missing required data");
        }
        await this.publisher.send({
            name: id.toString()
        });
        return {
            slideshow: {
                author: result.slideshow.author,
                date: result.slideshow.date
            }
        };
    }
};
HttpBin = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject("sqs_publisher")),
    tslib_1.__param(1, inversify_1.inject("config")),
    tslib_1.__metadata("design:paramtypes", [pubsub_1.Publisher, Object])
], HttpBin);
exports.HttpBin = HttpBin;
//# sourceMappingURL=bank_service.js.map