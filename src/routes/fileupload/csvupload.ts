import express from "express";
import upload from "../helpers/fileUpload";
import { csvToDb } from "../helpers/fileUpload";
import path from "path";
import { response } from "../helpers/fileUpload";
import { Parser } from "json2csv";

const router = express.Router();

router.post('/upload', upload.single('uploads'),
    async (req, res) => {
        const dirPsth = path.join(__dirname, `../../../uploads/${req.file?.filename}`);
        const response = await csvToDb(dirPsth)
        console.log(req.file);
        res.send(response)
    }
)

router.get('/get-csv',
    async (req, res) => {
        const json2csvparser = new Parser();
        const csv = json2csvparser.parse(response.invalid)
        res.attachment("invalid.csv");
        res.status(200).send(csv)

    })
export default router;