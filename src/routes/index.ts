import express from "express";
import signup from './acess/signup';
import csvupload from './fileupload/csvupload'
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Application running now!!');
  })
  router.use('/signup',signup);
  router.use('/upload',csvupload)

  export default router;
