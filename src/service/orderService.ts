import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from '../const/status';
import orderDAO from '../dao/orderDAO'
import CustomError from '../error/customError';
import logger from "../_base/log/logger4js";
import groupDAO from "../dao/groupDAO";
import restaurantDAO from "../dao/restaurantDAO";
import groupCustomerDAO from "../dao/groupCustomerDAO";
import dateUtil from "../util/dateUtil";

class OrderService {
  private static _instance: OrderService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  private async generateOrderId() {
    let maxId = await orderDAO.getMaxOrderId();
    if (!maxId) {
      maxId = "OD-000000";
    }
    const arr = maxId.split("-");
    let nextId = (parseInt(arr[1], 10) + 1).toString().padStart(6, "0");
    return arr[0] + "-" + nextId.toString();
  }
  
  public async getById(id: string) {
    try {
      const order = await orderDAO.getById(id);
      if (!order) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_GET_BY_ID_ERROR);
      }
      return order;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_GET_BY_ID_ERROR);
    }
  }

  public async getByGroupId(id: string) {
    try {
      const group = await groupDAO.getById(id);
      if (!group) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_INVALID_ID);
      }
      const order = await orderDAO.getByGroupId(id);
      if (!order) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_GET_BY_ID_ERROR);
      }
      return order;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_GET_BY_ID_ERROR);
    }
  }

  public async getByRestaurantId(id: string) {
    try {
      const restaurant = await restaurantDAO.getById(id);
      if (!restaurant) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_INVALID_ID);
      }
      const orders = await orderDAO.getByRestaurantId(id);
      return orders;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_GET_BY_ID_ERROR);
    }
  }



  public async createOne(e: any) {
    try {
      // Generate Next Id
      const nextId = await this.generateOrderId();
      // logger.debug("GENERATE" + nextId);
      const group = await groupDAO.getById(e.groupid);

      if(!group){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_INVALID_ID);
      }
      
      if(group.leader.id !== e.leader){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }
      const exit = await orderDAO.getByGroupId(e.groupid);
      if(exit != null){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ALREADY_ORDERED);
      }


      // Create Order to save
      let newOrder = orderDAO.create({
        id: nextId,
        time: dateUtil.fromTimeString(e.time),
        group: group,
        note: e.note,
        approve: 0,
        restaurantId: group.restaurant.id,
      });


      // Save order in database
      newOrder = await orderDAO.save(newOrder);
      return newOrder;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_CREATE_ERROR);
    }
  }
  public async updateInfo(order: any) {
    try {

      const e = await orderDAO.getById(order.id);
      if (e) {
        let newOrder: any = {
          id: e.id,
          time: e.time,
          group: e.group,
          note: e.note,
          approve: order.approve,
          restaurantId: e.restaurantId,
        };
        await orderDAO.update(newOrder);
        return newOrder;
      }
      else {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_UPDATE_ERROR);
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_UPDATE_ERROR);
    }
  }
  
}

export default OrderService.Instance