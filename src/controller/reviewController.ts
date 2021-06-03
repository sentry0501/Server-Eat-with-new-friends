import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import ReviewCreateDTO from "../dto/review/reviewCreateDTO";
import ReviewListFindDTO from "../dto/review/reviewListFindDTO";
import reviewService from "../service/reviewService"
import sendResAppJson from "../dto/response/sendResAppJson";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";
import AuthorGroupRole from "../config/authorGroupRoleConfig";


class ReviewController extends AbstractController {
  private static _instance: ReviewController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async getByRestaurantId(req: any, res: any, next: any) {
    try {
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_INVALID_ID);
      }
      const reviews = await reviewService.getByRestaurantId(req.body.id);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new ReviewListFindDTO(reviews));
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


      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode != AuthorGroupRole.CUSTOMER) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      const review = await reviewService.createOne(req.body);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new ReviewCreateDTO(review));
    }
    catch(error) {
      next(error)
    }
  }
}

export default ReviewController.Instance