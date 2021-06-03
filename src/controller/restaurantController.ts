import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import RestaurantCreateDTO from "../dto/restaurant/restaurantCreateDTO";
import RestaurantsListFindDTO from "../dto/restaurant/restaurantsListFindDTO";
import restaurantService from "../service/restaurantService"
import sendResAppJson from "../dto/response/sendResAppJson";
import ValidatorRestaurant from "../validator/validatorRestaurant";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";
import RestaurantsDeleteDTO from "../dto/restaurant/restaurantsDeleteDTO";
import authorConfig from "../_base/author/authorConfig";
import AuthorGroupRole from "../config/authorGroupRoleConfig";

class RestaurantController extends AbstractController {
  private static _instance: RestaurantController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async getById(req: any, res: any, next: any) {
    try {
      // logger.debug("json "+JSON.stringify(req.body))
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_INVALID_ID);
      }
      const restaurant = await restaurantService.getById(req.body.id);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new RestaurantCreateDTO(restaurant));
    }
    catch(error) {
      next(error)
    }
  }

  public async getByName(req: any, res: any, next: any) {
    try {
      if (!req.body.name) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_INVALID_NAME);
      }
      const restaurants = await restaurantService.getByName(req.body.name);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new RestaurantsListFindDTO(restaurants));
    }
    catch(error) {
      next(error)
    }
  }

  public async getAll(req: any, res: any, next: any) {
    try {
      const restaurants = await restaurantService.getAll();
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new RestaurantsListFindDTO(restaurants));
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
      
      const ids = await restaurantService.delete(req.body.ids);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new RestaurantsDeleteDTO(ids));
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
      const errCode = ValidatorRestaurant.isValidRestaurantWhenUpdate(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode != AuthorGroupRole.RESTAURANT) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      // Handle file
      if (!req.files.avatar[0] || !req.files.avatar[0]) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_UPLOAD_AVA_ERROR);
      }
      if (!req.files.cover[0] || !req.files.cover[0]) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_UPLOAD_COVER_ERROR);
      }
      const avatar = req.files.avatar[0].path;
      const cover = req.files.cover[0].path;

      const restaurant = await restaurantService.updateInfo(req.body, avatar,cover);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new RestaurantCreateDTO(restaurant));
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
      const errCode = ValidatorRestaurant.isValidRestaurant(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // logger.debug("debug cover "+JSON.stringify(req.files.avatar[0].path))
      
      // Handle file
      if (!req.files.avatar[0] || !req.files.avatar[0]) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_UPLOAD_AVA_ERROR);
      }
      if (!req.files.cover[0] || !req.files.cover[0]) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_UPLOAD_COVER_ERROR);
      }
      const avatar = req.files.avatar[0].path;
      const cover = req.files.cover[0].path;

      const restaurant = await restaurantService.createOne(req.body, avatar,cover);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new RestaurantCreateDTO(restaurant));
    }
    catch(error) {
      next(error)
    }
  }
}

export default RestaurantController.Instance