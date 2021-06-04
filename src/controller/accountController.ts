import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import sendResAppJson from "../dto/response/sendResAppJson";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import accountService from "../service/accountService";
import validatorSignIn from "../validator/validatorSignIn";
import AccountSignInDTO from "../dto/account/accountSignInDTO";
import AccountRestaurantSignInDTO from "../dto/account/accountRestaurantSignInDTO";
import AbstractController from "./abstractController";
import AuthorGroupRole from "../config/authorGroupRoleConfig";

class AccountController extends AbstractController {
  private static _instance: AccountController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async authTokenAndPassRoleCodeToResLocals(req: any, res: any, next: any) {
    try {
      req.header('Authorization')
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query)
      +'\nheaders.authorization:'+JSON.stringify(req.headers.authorization));

      if (!super.shouldAuth()) {
        next();
        return;
      }

      const token = accountService.extractTokenBearerHeader(req.headers['authorization']);
      if (token == "") {
        throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_INVALID_TOKEN);
      }

      const payload = await accountService.verifyTokenAndGetPayload(token);
      const roleCode = payload.roleCode;
      const id = payload.id;
      if (roleCode === null) {
        throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_INVALID_TOKEN);
      }
      res.locals.roleCode = roleCode;
      res.locals.id = id;
      next();
    }
    catch (e) {
      next(e);
    }
  }
  public async signIn(req: any, res: any, next: any) {
    try {
      // Validate
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = validatorSignIn.isValidSignIn(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      const account = req.body.account;
      const password = req.body.password;

      const tokenCustomer = await accountService.signIn(account, password);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new AccountSignInDTO(tokenCustomer.token, tokenCustomer.customer));
    }
    catch(e) {
      next(e);
    }
  }

  public async restaurantSignIn(req: any, res: any, next: any) {
    try {
      // Validate
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = validatorSignIn.isValidSignIn(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      const account = req.body.account;
      const password = req.body.password;

      const tokenRestaurant = await accountService.restaurantSignIn(account, password);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new AccountRestaurantSignInDTO(tokenRestaurant.token, tokenRestaurant.restaurant));
    }
    catch(e) {
      next(e);
    }
  }

  public async changepass(req: any, res: any, next: any) {
    try {
      // Validate
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = validatorSignIn.isValidChangePass(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      const account = req.body.account;
      const password = req.body.password;
      const newpassword = req.body.newpassword;

      const tokenCustomer = await accountService.changepass(account, password,newpassword);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new AccountSignInDTO(tokenCustomer.token, tokenCustomer.customer));
    }
    catch(e) {
      next(e);
    }
  }

  public async changepassRes(req: any, res: any, next: any) {
    try {
      // Validate
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = validatorSignIn.isValidChangePass(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      const account = req.body.account;
      const password = req.body.password;
      const newpassword = req.body.newpassword;

      const tokenRestaurant = await accountService.changepassrRes(account, password,newpassword);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new AccountRestaurantSignInDTO(tokenRestaurant.token, tokenRestaurant.restaurant));
    }
    catch(e) {
      next(e);
    }
  }

}

export default AccountController.Instance