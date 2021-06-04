import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import CustomerCreateDTO from "../dto/customer/customerCreateDTO";
import CustomersListFindDTO from "../dto/customer/customersListFindDTO";
import customerService from "../service/customerService"
import sendResAppJson from "../dto/response/sendResAppJson";
import ValidatorCustomer from "../validator/validatorCustomer";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";
import CustomersDeleteDTO from "../dto/customer/customersDeleteDTO";
import AuthorGroupRole from "../config/authorGroupRoleConfig";
import bucket from '.././_base/file/firebase';

class CustomerController extends AbstractController {
  private static _instance: CustomerController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async getById(req: any, res: any, next: any) {
    try {
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_INVALID_ID);
      }
      const customer = await customerService.getById(req.body.id);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new CustomerCreateDTO(customer));
    }
    catch(error) {
      next(error)
    }
  }
  public async getByName(req: any, res: any, next: any) {
    try {
      if (!req.body.name) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_INVALID_NAME);
      }
      const customers = await customerService.getByName(req.body.name);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new CustomersListFindDTO(customers));
    }
    catch(error) {
      next(error)
    }
  }

  public async getAll(req: any, res: any, next: any) {
    try {
      const customers = await customerService.getAll();
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new CustomersListFindDTO(customers));
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
      
      const ids = await customerService.delete(req.body.ids);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new CustomersDeleteDTO(ids));
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
      const errCode = ValidatorCustomer.isValidCustomerWhenUpdate(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      logger.debug("roleCode: "+ roleCode)
      if (roleCode != AuthorGroupRole.CUSTOMER) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      // Handle file
      let path;
      if (!res.locals.url) {
        path = null;
      }
      else {
        path = res.locals.url;
      }

      const customer = await customerService.updateInfo(req.body, path);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new CustomerCreateDTO(customer));
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
      const errCode = ValidatorCustomer.isValidCustomer(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }



      // logger.debug("url "+res.locals.url)
      // Handle file
      if (!res.locals.url) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.CUSTOMER_UPLOAD_AVA_ERROR);
      }
      const path = res.locals.url;

      const customer = await customerService.createOne(req.body, path);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new CustomerCreateDTO(customer));
    }
    catch(error) {
      next(error)
    }
  }
}

export default CustomerController.Instance