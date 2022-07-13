"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.default = {
    csvSchema: joi_1.default.object({
        Domain: joi_1.default.string().required().label('Domain should not be empty'),
        ParentCompany: joi_1.default.string().required().label('parentcompany should not be empty'),
        Brand: joi_1.default.string().required().label('brand should not be null'),
        Type: joi_1.default.string().valid('Target', 'Competitor', 'Other'),
    }),
    testschema: joi_1.default.object({
        Name: joi_1.default.string().required(),
        Surname: joi_1.default.string().required(),
        Age: joi_1.default.string().required(),
    }),
};
//# sourceMappingURL=fileheader.js.map