import { HttpBin } from "../../services/bank_service";
import { APIController } from "./interfaces";
export declare class HelloController implements APIController {
    private bank;
    constructor(bank: HttpBin);
    private index;
}
