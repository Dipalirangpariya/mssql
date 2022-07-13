import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { corsUrl } from "./config";
import {environment } from './config';
import './database'; // initialize database
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import logger from "./core/logger";
import routes from './routes';
import path from 'path'
const app = express();
const dirpath= path.join(__dirname,`./uploads`)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }))
app.use(express.static(dirpath));

//routes
app.use('/v1', routes);


// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
      ApiError.handle(err, res);
    } else {
      if (environment === 'development') {
        logger.error(err);
        return res.status(500).send(err.message);
      }
      ApiError.handle(new InternalError(), res);
    }
  });
  export default app;
