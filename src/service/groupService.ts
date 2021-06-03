import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from '../const/status';
import groupDAO from '../dao/groupDAO'
import CustomError from '../error/customError';
import logger from "../_base/log/logger4js";
import dateUtil from "../util/dateUtil";
import { GroupEntity } from "../entity/groupEntity";
import customerDAO from "../dao/customerDAO";
import groupCustomerDAO from "../dao/groupCustomerDAO";
import restaurantDAO from "../dao/restaurantDAO";
import { GroupCustomerEntity } from "../entity/groupCustomerEntity";
// import groupProductDAO from "../dao/groupProductDAO";
// import GroupProductService from "./groupProductService";
// import groupProductService from "./groupProductService";
// import { GroupProductEntity } from "../entity/groupProductEntity";

class GroupService {
  private static _instance: GroupService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async join(e: any) {
    try {

      let newcustomer = await customerDAO.getById(e.customer);
      let restaurant = await restaurantDAO.getById(e.restaurant);
      
      if (!newcustomer){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_INVALID_ID);
      }
      if (!restaurant){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_INVALID_ID);
      }
      const exitGroup = await groupCustomerDAO.checkInGroup(e.customer,e.restaurant);
      if(exitGroup){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_ALREADY_IN_GROUP);
      }

      let oldGroup = await groupDAO.findValid(restaurant.id);

      if(!oldGroup){
        let newGroup = new GroupEntity();
        newGroup.name = "Nhóm nhà hàng " + restaurant.name,
        newGroup.leader = newcustomer,
        newGroup.members = 1,
        newGroup.restaurant = restaurant
        newGroup = await groupDAO.save(newGroup);
        if(!newGroup){
          throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_CREATE_ERROR);
        }

        let newGroupCustomers = new GroupCustomerEntity;
        newGroupCustomers.group = newGroup;
        newGroupCustomers.customer = newcustomer;
        newGroupCustomers.restaurantId = restaurant.id;

        const groupCustomer = await groupCustomerDAO.save(newGroupCustomers);

        if(!groupCustomer){
          throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_JOIN_ERROR);
        }
        return newGroup;
      } 
      else{
        oldGroup.members = oldGroup.members + 1,
        oldGroup = await groupDAO.save(oldGroup);

        let newGroupCustomers = new GroupCustomerEntity;
        newGroupCustomers.group = oldGroup;
        newGroupCustomers.customer = newcustomer;
        newGroupCustomers.restaurantId = restaurant.id;

        const groupCustomer = await groupCustomerDAO.save(newGroupCustomers);
        if(!groupCustomer){
          throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_JOIN_ERROR);
        }
        return oldGroup;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_JOIN_ERROR);
    }
  }


  public async leave(ecustomer: any, egroup:any) {
    try {

      let newcustomer = await customerDAO.getById(ecustomer);
      let group = await groupDAO.getById(egroup);
      
      if (!newcustomer){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_INVALID_ID);
      }
      if (!group){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_INVALID_ID);
      }


      const exitGroup = await groupCustomerDAO.checkInGroup(ecustomer,group.restaurant.id);
      if(!exitGroup){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_NOT_IN_GROUP);
      }
      
      await groupCustomerDAO.deleteByCustomerId(ecustomer,egroup);

      group.members = group.members - 1;
      if(group.members <= 0){
        await groupDAO.deleteByIds([egroup]);
        return;
      }
      else{
        if(group.leader.id===newcustomer.id){
          group.leader = await groupCustomerDAO.getByNewLeader(group.id);
          if(!group.leader){
            throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_LEAVE_ERROR);
          }
          await groupDAO.save(group);
        }
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_LEAVE_ERROR);
    }
  }

  // public async delete(ids: Array<string>) {
  //   try {
  //     const groups = await groupDAO.deleteByIds(ids);
  //     let del: any = groups.affected
  //     // logger.debug("Delete1"+ del)
  //     let dels: number = del 
  //     return dels;
  //   }
  //   catch(e) {
  //     if (e instanceof QueryFailedError) {
  //       logger.debug(e);
  //       logger.debug("QueryFailedError");
  //     }
  //     if (e instanceof CustomError) {
  //       logger.debug('CustomError');
  //       throw e;
  //     }
  //     throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_DELETE_ERROR);
  //   }
  // }


  public async getMembers(req: any) {
    try {
      // logger.debug("Delete1")
      const groupCustomers = await groupCustomerDAO.getByGroupId(req.id);
      const customers = groupCustomers.map((e) => e.customer);

      // let del = Array.from(groups.affected?.toString());
      
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_GET_BY_ID_ERROR);
    }
  }

  public async getByCustomerId(req: any) {
    try {
      // logger.debug("Delete1")
      const groupCustomers = await groupCustomerDAO.getByCustomerId(req.id);
      const groups = groupCustomers.map((e) => e.group);

      // let del = Array.from(groups.affected?.toString());
      
      return groups;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.GROUP_GET_BY_CUSTOMER_ID_ERROR);
    }
  }
  
}

export default GroupService.Instance