import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from '../const/status';
import reviewDAO from '../dao/reviewDAO'
import CustomError from '../error/customError';
import logger from "../_base/log/logger4js";
import restaurantDAO from "../dao/restaurantDAO";
import customerDAO from "../dao/customerDAO";
import dateUtil from "../util/dateUtil";

class ReviewService {
  private static _instance: ReviewService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }
 

  public async getByRestaurantId(id: string) {
    try {
      const restaurant = await restaurantDAO.getById(id);
      if (!restaurant) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_INVALID_ID);
      }
      const reviews = await reviewDAO.getByRestaurantId(id);
      return reviews;
    }
    catch(e) {
      if (e instanceof QueryFailedError) {
        logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PROMOTION_GET_BY_ID_ERROR);
    }
  }


  public async createOne(e: any) {
    try {
      // Generate Next Id
      // logger.debug("GENERATE" + nextId);
      const restaurant = await restaurantDAO.getById(e.restaurantid);

      if(!restaurant){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_INVALID_ID);
      }

      const customer = await customerDAO.getById(e.customerid);

      if(!customer){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_INVALID_ID);
      }
      // Create Review to save
      let newReview = reviewDAO.create({
        content: e.content,
        restaurant: restaurant,
        customer: customer,
        date: dateUtil.fromString(e.date),
        star: e.star,
      });

      // Save review in database
      newReview = await reviewDAO.save(newReview);
      return newReview;
    }
    catch(e) {
      if (e instanceof QueryFailedError) {
        logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PROMOTION_CREATE_ERROR);
    }
  }

}

export default ReviewService.Instance