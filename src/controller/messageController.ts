import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import MessageCreateDTO from "../dto/message/messageCreateDTO";
import MessageListFindDTO from "../dto/message/messageListFindDTO";
import messageService from "../service/messageService"
import sendResAppJson from "../dto/response/sendResAppJson";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";
import AuthorGroupRole from "../config/authorGroupRoleConfig";


class MessageController extends AbstractController {
  private static _instance: MessageController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async getByGroupId(req: any, res: any, next: any) {
    try {
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_INVALID_ID);
      }
      const messages = await messageService.getByGroupId(req.body.id);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new MessageListFindDTO(messages));
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

      const message = await messageService.createOne(req.body);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new MessageCreateDTO(message));
    }
    catch(error) {
      next(error)
    }
  }
}

export default MessageController.Instance