"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvToDb = exports.response = void 0;
const multer_1 = __importDefault(require("multer"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const fileheader_1 = __importDefault(require("../../constant/fileheader"));
const json2csv_1 = require("json2csv");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (res, file, callback) {
        if (file.mimetype.includes("csv") || file.mimetype.includes("xml") || file.mimetype.includes("xlsx")) {
            callback(null, true);
        }
        else {
            console.log("only csv  file supported!");
            callback(null, false);
        }
    },
    //2mb limit
    limits: {
        fileSize: 1024 * 1024 * 200,
    },
});
exports.response = {
    invalid: [],
    valid: []
};
async function csvToDb(path1) {
    await new Promise((resolve, reject) => {
        fs_1.default.createReadStream(path1)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => {
            const result = fileheader_1.default.csvSchema.validate(data);
            if (result.error) {
                const errorresult = { 'message': result.error.message };
                const mergeddata = {
                    ...data,
                    ...errorresult
                };
                exports.response.invalid.push(mergeddata);
            }
            else {
                exports.response.valid.push(data);
            }
        })
            .on('end', () => {
            resolve(exports.response);
        }).on("error", (error) => {
            reject(error);
        });
    });
    const json2csvparser = new json2csv_1.Parser();
    const csv = json2csvparser.parse(exports.response.invalid);
    fs_1.default.writeFile('invalid.csv', csv, function (err) {
        if (err) {
            throw err;
        }
        console.log("file saveddd");
    });
    console.log(csv);
    return exports.response;
}
exports.csvToDb = csvToDb;
exports.default = upload;
//# sourceMappingURL=fileUpload.js.map