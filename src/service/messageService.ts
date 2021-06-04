import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from '../const/status';
import messageDAO from '../dao/messageDAO'
import CustomError from '../error/customError';
import logger from "../_base/log/logger4js";
import groupDAO from "../dao/groupDAO";
import customerDAO from "../dao/customerDAO";
import dateUtil from "../util/dateUtil";

class MessageService {
  private static _instance: MessageService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }
 

  public async getByGroupId(id: string) {
    try {
      const group = await groupDAO.getById(id);
      if (!group) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_INVALID_ID);
      }
      const messages = await messageDAO.getByGroupId(id);
      return messages;
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
      const group = await groupDAO.getById(e.groupid);

      if(!group){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_INVALID_ID);
      }

      const customer = await customerDAO.getById(e.customerid);

      if(!customer){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_INVALID_ID);
      }
      // Create Message to save
      let newMessage = messageDAO.create({
        content: e.content,
        group: group,
        customer: customer,
        date: dateUtil.fromTimeString(e.date),
      });

      // Save message in database
      newMessage = await messageDAO.save(newMessage);
      return newMessage;
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

export default MessageService.Instance