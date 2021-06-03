import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import GroupJoinDTO from "../dto/group/groupJoinDTO";
import groupService from "../service/groupService"
import sendResAppJson from "../dto/response/sendResAppJson";
import ValidatorGroup from "../validator/validatorGroup";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";
import validatorGroup from "../validator/validatorGroup";
import authorConfig from "../_base/author/authorConfig";
import AuthorGroupRole from "../config/authorGroupRoleConfig";
import CustomersListFindDTO from "../dto/customer/customersListFindDTO";
import GroupListFindDTO from "../dto/group/groupListFindDTO";
// import GroupListFindDTO from "../dto/group/groupListFindDTO";
// import GroupDeleteDTO from "../dto/group/groupDeleteDTO";
// import GroupItemFindDTO from "../dto/group/groupItemFindDTO";
// import Stat24hDTO from "../dto/group/stat24hDTO";

class GroupController extends AbstractController {
  private static _instance: GroupController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async join(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = validatorGroup.isGroup(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode != AuthorGroupRole.CUSTOMER) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }


      const group = await groupService.join(req.body);

      
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new GroupJoinDTO(group));
    }
    catch(error) {
      next(error)
    }
  }


  public async leave(req: any, res: any, next: any) {
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


      const group = await groupService.leave(req.body.customer,req.body.group);

      
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK);
    }
    catch(error) {
      next(error)
    }
  }

  public async getMembers(req: any, res: any, next: any){
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


      const customers = await groupService.getMembers(req.body);

      
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new CustomersListFindDTO(customers));
    }
    catch(error) {
      next(error)
    }
  }

  public async getByCustomerId(req: any, res: any, next: any){
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


      const groups = await groupService.getByCustomerId(req.body);

      
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new GroupListFindDTO(groups));
    }
    catch(error) {
      next(error)
    }
  }

}

export default GroupController.Instance