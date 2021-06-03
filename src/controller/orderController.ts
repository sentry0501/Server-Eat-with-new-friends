import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import OrderCreateDTO from "../dto/order/orderCreateDTO";
import OrderListFindDTO from "../dto/order/orderListFindDTO";
import orderService from "../service/orderService"
import sendResAppJson from "../dto/response/sendResAppJson";
import ValidatorOrder from "../validator/validatorOrder";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";
import AuthorGroupRole from "../config/authorGroupRoleConfig";


class OrderController extends AbstractController {
  private static _instance: OrderController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async getByGroupId(req: any, res: any, next: any) {
    try {
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_INVALID_ID);
      }
      const order = await orderService.getByGroupId(req.body.id);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new OrderCreateDTO(order));
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

      const roleCode = res.locals.roleCode;
      if (roleCode != AuthorGroupRole.RESTAURANT) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      const orders = await orderService.getByRestaurantId(req.body.id);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new OrderListFindDTO(orders));
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
      // const errCode = ValidatorOrder.isOrder(req.body);
      // if (errCode !== ERR_CODE.OK) {
      //   throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      // }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode != AuthorGroupRole.RESTAURANT) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      const order = await orderService.updateInfo(req.body);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new OrderCreateDTO(order));
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
      const errCode = ValidatorOrder.isOrder(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode != AuthorGroupRole.CUSTOMER) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      const order = await orderService.createOne(req.body);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new OrderCreateDTO(order));
    }
    catch(error) {
      next(error)
    }
  }

}

export default OrderController.Instance