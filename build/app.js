"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const config_2 = require("./config");
require("./database"); // initialize database
const ApiError_1 = require("./core/ApiError");
const logger_1 = __importDefault(require("./core/logger"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const dirpath = path_1.default.join(__dirname, `./uploads`);
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use((0, cors_1.default)({ origin: config_1.corsUrl, optionsSuccessStatus: 200 }));
app.use(express_1.default.static(dirpath));
//routes
app.use('/v1', routes_1.default);
// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    if (err instanceof ApiError_1.ApiError) {
        ApiError_1.ApiError.handle(err, res);
    }
    else {
        if (config_2.environment === 'development') {
            logger_1.default.error(err);
            return res.status(500).send(err.message);
        }
        ApiError_1.ApiError.handle(new ApiError_1.InternalError(), res);
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map