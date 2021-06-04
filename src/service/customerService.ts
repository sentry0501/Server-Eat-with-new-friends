import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from '../const/status';
import customerDAO from '../dao/customerDAO'
import CustomError from '../error/customError';
import logger from "../_base/log/logger4js";
import dateUtil from "../util/dateUtil";
import accountService from "./accountService";
import groupService from "./groupService";
import groupDAO from "../dao/groupDAO";
import groupCustomerDAO from "../dao/groupCustomerDAO";


class CustomerService {
  private static _instance: CustomerService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  private async generateCustomerId() {
    let maxId = await customerDAO.getMaxCustomerId();
    if (!maxId) {
      maxId = "CF-000000";
    }
    const arr = maxId.split("-");
    let nextId = (parseInt(arr[1], 10) + 1).toString().padStart(6, "0");
    return arr[0] + "-" + nextId.toString();
  }

  public async getById(id: string) {
    try {
      const customer = await customerDAO.getById(id);
      if (!customer) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_GET_BY_ID_ERROR);
      }
      return customer;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_GET_BY_ID_ERROR);
    }
  }

  public async getByName(name: string) {
    try {
      const customers = await customerDAO.getByName(name);
      if (!customers) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_GET_BY_NAME_ERROR);
      }
      return customers;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_GET_BY_NAME_ERROR);
    }
  }

  public async getAll() {
    const customers = await customerDAO.getAll();
    return customers;
  }
  public async delete(ids: string) {
    try {
      const customer = await customerDAO.getById(ids);
      if(!customer){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_INVALID_ID);
      }
      
      // const deletedIds = customers.map((e) => e.id);
      // const deletedIds = customers;
      // logger.debug("Delete" + customers.id)
      const groups = await groupCustomerDAO.getByCustomerId(customer.id);
      for (const group of groups){
        await groupService.leave(customer.id,group.group.id);
      }


      const customers = await customerDAO.deleteByIds(ids);
      if(!customers){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_DELETE_ERROR);
      }
      return customers.id;
    }
    catch {
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_DELETE_ERROR);
    }
  }
  public async updateInfo(customer: any, avatarPath: string) {
    try {
      // Gen Date
      customer.birthday = dateUtil.fromString(customer.birthday)

      const e = await customerDAO.getById(customer.id);
      if (e) {
        let newCustomer: any = {
          id: e.id,
          name: customer.name,
          avatarUri: avatarPath ? avatarPath : e.avatarUri,
          isActive: customer.isActive === false ? false : true,
          address: customer.address,
          hashPassword: e.hashPassword,
          birthday: customer.birthday,
          roleCode: customer.roleCode,
        };
        if (customer.account.toString() != e.account.toString()) {
          newCustomer.account = customer.account;
        }
        await customerDAO.update(newCustomer);
        let newEntity = await this.getById(e.id);
        newEntity.password = e.password;
        return newEntity;
      }
      else {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_UPDATE_ERROR);
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_UPDATE_ERROR);
    }
  }
  public async createOne(e: any, avatarPath: string) {
    try {
      // Generate Next Ids
      const nextId = await this.generateCustomerId();
      logger.debug("GENERATE" + nextId);

      // Hash Password
      e.hashPassword = await accountService.hashPassword(e.password);

      // Gen Date
      e.birthday = dateUtil.fromString(e.birthday)

      // Create Customer to save
      let newCustomer = customerDAO.create({
        id: nextId,
        name: e.name,
        avatarUri: avatarPath,
        isActive: e.isActive === false ? false : true,
        account: e.account,
        address: e.address,
        hashPassword: e.hashPassword,
        birthday: e.birthday,
        roleCode: e.roleCode,
      });
      newCustomer.password = e.password;

      // Save customer in database
      newCustomer = await customerDAO.save(newCustomer);
      return newCustomer;
    }
    catch(e) {
      logger.error(e+"\n");
      logger.error(JSON.stringify(e));
      if (e instanceof QueryFailedError) {
        // logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_CREATE_ERROR);
    }
  }
}

export default CustomerService.Instance