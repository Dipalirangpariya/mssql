import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";
import path from 'path';
import schema from '../../constant/fileheader'
import { Parser } from "json2csv";
import readXlsxFile from 'read-excel-file'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (res, file, callback) {
        if (file.mimetype.includes("csv") ) {
            callback(null, true);
        } else {
            console.log("only csv  file supported!");
            callback(null, false);
        }
    },
    //2mb limit
    limits: {
        fileSize: 1024 * 1024 * 200,

    },
})

export const response: any = {
    invalid: [],
    valid: []
}
export async function csvToDb(path1: fs.PathLike) {
    await new Promise((resolve, reject) => {
        fs.createReadStream(path1)
            .pipe(csvParser())
            .on('data', (data) => {
                const result = schema.csvSchema.validate(data)
                if (result.error) {
                    const errorresult = { 'message': result.error.message }
                    const mergeddata = {
                        ...data,
                        ...errorresult
                    }
                    response.invalid.push(mergeddata)
                }
                else {
                    response.valid.push(data)
                }
            })
            .on('end', () => {
                resolve(response);

            }).on("error", (error) => {
                reject(error)
            })
    });
    const json2csvparser = new Parser();
    const csv = json2csvparser.parse(response.invalid)
    fs.writeFile('invalid.csv', csv, function (err) {
        if (err) {
            throw err;
        }
        console.log("file saveddd");

    })
    console.log(csv);
    return response;

}

export default upload;

