import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import PromotionCreateDTO from "../dto/promotion/promotionCreateDTO";
import PromotionListFindDTO from "../dto/promotion/promotionListFindDTO";
import promotionService from "../service/promotionService"
import sendResAppJson from "../dto/response/sendResAppJson";
import ValidatorPromotion from "../validator/validatorPromotion";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";
import PromotionDeleteDTO from "../dto/promotion/promotionDeleteDTO";
import AuthorGroupRole from "../config/authorGroupRoleConfig";


class PromotionController extends AbstractController {
  private static _instance: PromotionController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async getById(req: any, res: any, next: any) {
    try {
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PROMOTION_INVALID_ID);
      }
      const promotion = await promotionService.getById(req.body.id);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new PromotionCreateDTO(promotion));
    }
    catch(error) {
      next(error)
    }
  }

  public async getByRestaurantId(req: any, res: any, next: any) {
    try {
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_INVALID_ID);
      }
      const promotions = await promotionService.getByRestaurantId(req.body.id);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new PromotionListFindDTO(promotions));
    }
    catch(error) {
      next(error)
    }
  }

  public async delete(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));
      
      const ids = await promotionService.delete(req.body.ids);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new PromotionDeleteDTO(ids));
    }
    catch(error) {
      next(error)
    }
  }
  public async updateInfo(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = ValidatorPromotion.isPromotion(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode != AuthorGroupRole.RESTAURANT) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      const promotion = await promotionService.updateInfo(req.body);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new PromotionCreateDTO(promotion));
    }
    catch(error) {
      next(error)
    }
  }
  public async createOne(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = ValidatorPromotion.isPromotion(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode != AuthorGroupRole.RESTAURANT) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      const promotion = await promotionService.createOne(req.body);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new PromotionCreateDTO(promotion));
    }
    catch(error) {
      next(error)
    }
  }
  public async updatePreview(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PROMOTION_INVALID_ID);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode != AuthorGroupRole.RESTAURANT) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      // Handle file
      let path;
      if (!req.file || !req.file.path) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PROMOTION_UPLOAD_PREVIEW_ERROR);
      }
      else {
        path = req.file.path;
      }

      const promotion = await promotionService.updatePreview(req.body.id, path);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new PromotionCreateDTO(promotion));
    }
    catch(error) {
      next(error)
    }
  }

}

export default PromotionController.Instance