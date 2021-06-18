import AuthorGroupRole from "../config/authorGroupRoleConfig";
import ERR_CODE from "../const/error";
import businessUtil from "../util/businessUtil";
import dateUtil from "../util/dateUtil";
import numberUtil from "../util/numberUtil";
import stringUtil from "../util/stringUtil";
import logger from "../_base/log/logger4js";

class ValidatorCustomer {
  private static _instance: ValidatorCustomer
  private constructor() {
  }
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private isValidRoleCode(roleCode: any) {
    return roleCode != null && Object.values(AuthorGroupRole).includes(Number(roleCode));
  }
  private isValidAccount(account: any, min: number= 6, max: number = 20) {
    return stringUtil.isValidString(account, 6, 20) &&  account.match(/^[0-9a-zA-Z]+$/)
  }

  public isValidCustomer(e: any) {
    if (!e || !stringUtil.isValidString(e.name, 0)) {
      return ERR_CODE.CUSTOMER_INVALID_NAME;
    }
    if (!stringUtil.isValidString(e.address, 0, 255)) {
      return ERR_CODE.CUSTOMER_INVALID_ADDRESS;
    }
    if (!this.isValidAccount(e.account, 6, 20)) {
      return ERR_CODE.CUSTOMER_INVALID_ACCOUNT;
    }
    if (!stringUtil.isValidString(e.password.trim(), 6, 20)) {
      return ERR_CODE.CUSTOMER_INVALID_PASSWORD;
    }
    if (!this.isValidRoleCode(e.roleCode)) {
      return ERR_CODE.CUSTOMER_INVALID_ROLE;
    }
    if (!dateUtil.isValidDateBeforeNow(e.birthday)) {
      // logger.debug("haha "+e.birthday)
      return ERR_CODE.CUSTOMER_INVALID_BIRTHDAY;
    }
    if (!dateUtil.isValidBirthDay(e.birthday)) {
      // logger.debug("haha "+e.birthday)
      return ERR_CODE.CUSTOMER_INVALID_BIRTHDAY;
    }
    return ERR_CODE.OK
  }
  public isValidCustomerWhenUpdate(e: any) {
    if (!e || !stringUtil.isValidString(e.name, 0)) {
      return ERR_CODE.CUSTOMER_INVALID_NAME;
    }
    if (!stringUtil.isValidString(e.address, 0, 255)) {
      return ERR_CODE.CUSTOMER_INVALID_ADDRESS;
    }
    if (!this.isValidAccount(e.account, 6, 20)) {
      return ERR_CODE.CUSTOMER_INVALID_ACCOUNT;
    }
    if (!this.isValidRoleCode(e.roleCode)) {
      return ERR_CODE.CUSTOMER_INVALID_ROLE;
    }
    if (!dateUtil.isValidDateBeforeNow(e.birthday)) {
      // logger.debug("haha "+e.birthday)
      return ERR_CODE.CUSTOMER_INVALID_BIRTHDAY;
    }
    if (!dateUtil.isValidBirthDay(e.birthday)) {
      // logger.debug("haha "+e.birthday)
      return ERR_CODE.CUSTOMER_INVALID_BIRTHDAY;
    }
    return ERR_CODE.OK
  }
}

export default ValidatorCustomer.Instance