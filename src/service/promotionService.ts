import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from '../const/status';
import promotionDAO from '../dao/promotionDAO'
import CustomError from '../error/customError';
import logger from "../_base/log/logger4js";
import restaurantDAO from "../dao/restaurantDAO";

class PromotionService {
  private static _instance: PromotionService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  private async generatePromotionId() {
    let maxId = await promotionDAO.getMaxPromotionId();
    if (!maxId) {
      maxId = "PM-000000";
    }
    const arr = maxId.split("-");
    let nextId = (parseInt(arr[1], 10) + 1).toString().padStart(6, "0");
    return arr[0] + "-" + nextId.toString();
  }
  
  public async getById(id: string) {
    try {
      const promotion = await promotionDAO.getById(id);
      if (!promotion) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PROMOTION_GET_BY_ID_ERROR);
      }
      return promotion;
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

  public async getByRestaurantId(id: string) {
    try {
      const restaurant = await restaurantDAO.getById(id);
      if (!restaurant) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_INVALID_ID);
      }
      const promotions = await promotionDAO.getByRestaurantId(id);
      return promotions;
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
      const nextId = await this.generatePromotionId();
      // logger.debug("GENERATE" + nextId);
      const restaurant = await restaurantDAO.getById(e.restaurantid);

      if(!restaurant){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_INVALID_ID);
      }
      // Create Promotion to save
      let newPromotion = promotionDAO.create({
        id: nextId,
        name: e.name,
        restaurant: restaurant,
        description: e.description,
        previewUri: "public/default-promotion.jpg",
        isActive: e.isActive === false ? false : true,
      });

      // Save promotion in database
      newPromotion = await promotionDAO.save(newPromotion);
      return newPromotion;
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
  public async updateInfo(promotion: any) {
    try {

      const e = await promotionDAO.getById(promotion.id);
      if (e) {
        let newPromotion: any = {
          id: e.id,
          name: promotion.name,
          restaurant: e.restaurant,
          description: promotion.description,
          previewUri: e.previewUri,
          isActive: promotion.isActive === false ? false : true, 
        };
        await promotionDAO.update(newPromotion);
        return newPromotion;
      }
      else {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PROMOTION_UPDATE_ERROR);
      }
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PROMOTION_UPDATE_ERROR);
    }
  }
  public async delete(ids: Array<string>) {
    try {
      const promotionss = await promotionDAO.deleteByIds(ids);
      const deletedIds = promotionss.map((e) => e.id);
      // const deletedIds = promotionss;
      // logger.debug("Delete" + deletedIds)
      return deletedIds;
    }
    catch {
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PROMOTION_DELETE_ERROR);
    }
  }
  public async updatePreview(id: string, previewPath: string) {
    try {

      const e = await promotionDAO.getById(id);
      if (e) {
        let newPromotion: any = {
          id: e.id,
          name: e.name,
          restaurant: e.restaurant,
          description: e.description,
          previewUri: previewPath ? previewPath : e.previewUri,
          isActive: e.isActive, 
        };
        await promotionDAO.update(newPromotion);
        return newPromotion;
      }
      else {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PROMOTION_UPLOAD_PREVIEW_ERROR);
      }
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PROMOTION_UPLOAD_PREVIEW_ERROR);
    }
  }

}

export default PromotionService.Instance