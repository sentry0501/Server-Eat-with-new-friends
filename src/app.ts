import express, {Express} from 'express';
import responseTime from 'response-time';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import STATUS_CODE from './const/status';
import ERR_CODE from "./const/error";
import logger from './_base/log/logger4js';
import sendResAppJson from './dto/response/sendResAppJson';
import globalErrorMiddleware from './error/globalErrorMiddleware';
import CustomError from './error/customError';
import env from './env';
import customerRoute from './route/customerRoute';
import restaurantRoute from './route/restaurantRoute';
import groupRoute from "./route/groupRoute";
import accountRoute from './route/accountRoute';
import productRoute from './route/productRoute';
import promotionRoute from './route/promotionRoute';
import orderRoute from './route/orderRoute';
import reviewRoute from './route/reviewRoute';
import * as path from 'path';
import serverConfig from './config/serverConfig';
import messageRoute from './route/messageRoute';
import { group } from 'node:console';

const app: Express = express();

/**
 * Library Middleware
 */
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// logger.debug("DIR" + path.relative(__dirname, '/static'));
/**
 * TODO: Could be fail when deploy
 */
app.use('/static',express.static("static"));
app.use('/public',express.static("public"));

/**
 * Log response time
 */
app.use(responseTime((req: any, res: any, time: number) => {
  logger.info(req.method + " " + serverConfig?.urlPrefix.replace(/.$/,"") + req.url + " in " + time.toFixed(3) + "ms");
}))

/**
 * Business logic
 */

app.use(customerRoute);
app.use(restaurantRoute);
app.use(groupRoute);

app.use(accountRoute);
app.use(productRoute);
app.use(promotionRoute);
app.use(orderRoute);
app.use(reviewRoute);
app.use(messageRoute);

/**
 * For testing
 */
app.get('/testok', (req, res) => {
  sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK);
})
app.get('/testerror', (req, res) => {
  throw new CustomError(STATUS_CODE.INTERNAL_SERVER_ERROR, ERR_CODE.INTERNAL_SERVER_ERROR, "testerror", {"name": 2, 3: 111}, 2);
})


/**
 * Handle Global Error (Custom Error and Uncontrollable Error)
 */
app.use(globalErrorMiddleware);
/**
 * Handle route that is not in router
 */
app.all('*', (req, res) => {
  sendResAppJson(res, STATUS_CODE.NOT_FOUND, ERR_CODE.NOT_FOUND);
})

export default app;