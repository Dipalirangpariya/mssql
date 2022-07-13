"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("./acess/signup"));
const csvupload_1 = __importDefault(require("./fileupload/csvupload"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('Application running now!!');
});
router.use('/signup', signup_1.default);
router.use('/upload', csvupload_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map