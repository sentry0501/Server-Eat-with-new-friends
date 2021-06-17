import ERR_CODE from "../const/error";
import stringUtil from "../util/stringUtil";

class ValidatorSignIn {
  private static _instance: ValidatorSignIn
  private constructor() {
  }
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
  private isValidAccount(account: any, min: number= 6, max: number = 20) {
    return stringUtil.isValidString(account, 6, 20) &&  account.match(/^[0-9a-zA-Z]+$/)
  }

  public isValidSignIn(e: any) {
    if (!stringUtil.isValidString(e.account, 6, 20)) {
      return ERR_CODE.ACCOUNT_INVALID_ACCOUNT;
    }
    if (!stringUtil.isValidString(e.password, 6, 20)) {
      return ERR_CODE.ACCOUNT_WRONG_PASSWORD;
    }
    return ERR_CODE.OK;
  }

  public isValidChangePass(e: any) {
    if (!stringUtil.isValidString(e.account, 6, 20)) {
      return ERR_CODE.ACCOUNT_INVALID_ACCOUNT;
    }
    if (!this.isValidAccount(e.account, 6, 20)) {
      return ERR_CODE.CUSTOMER_INVALID_ACCOUNT;
    }
    if (!stringUtil.isValidString(e.password, 6, 20)) {
      return ERR_CODE.ACCOUNT_WRONG_PASSWORD;
    }
    if (!stringUtil.isValidString(e.newpassword.trim(), 6, 20)) {
      return ERR_CODE.ACCOUNT_WRONG_PASSWORD;
    }
    return ERR_CODE.OK;
  }
}

export default ValidatorSignIn.Instance