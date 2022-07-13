"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileUpload_1 = __importDefault(require("../helpers/fileUpload"));
const fileUpload_2 = require("../helpers/fileUpload");
const path_1 = __importDefault(require("path"));
const fileUpload_3 = require("../helpers/fileUpload");
const json2csv_1 = require("json2csv");
const router = express_1.default.Router();
router.post('/upload', fileUpload_1.default.single('uploads'), async (req, res) => {
    var _a;
    const dirPsth = path_1.default.join(__dirname, `../../../uploads/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`);
    const response = await (0, fileUpload_2.csvToDb)(dirPsth);
    console.log(req.file);
    res.send(response);
});
router.get('/get-csv', async (req, res) => {
    const json2csvparser = new json2csv_1.Parser();
    const csv = json2csvparser.parse(fileUpload_3.response.invalid);
    res.attachment("invalid.csv");
    res.status(200).send(csv);
});
exports.default = router;
//# sourceMappingURL=csvupload.js.map