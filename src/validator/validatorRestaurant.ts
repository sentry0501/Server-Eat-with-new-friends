import AuthorGroupRole from "../config/authorGroupRoleConfig";
import ERR_CODE from "../const/error";
import businessUtil from "../util/businessUtil";
import dateUtil from "../util/dateUtil";
import numberUtil from "../util/numberUtil";
import stringUtil from "../util/stringUtil";

class ValidatorRestaurant {
  private static _instance: ValidatorRestaurant
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

  public isValidRestaurant(e: any) {
    if (!e || !stringUtil.isValidString(e.name, 0)) {
      return ERR_CODE.RESTAURANT_INVALID_NAME;
    }
    if (!stringUtil.isValidString(e.address, 0, 255)) {
      return ERR_CODE.RESTAURANT_INVALID_ADDRESS;
    }
    if (!stringUtil.isValidString(e.description, 0, 3000)) {
      return ERR_CODE.RESTAURANT_INVALID_DESCRIPTION;
    }
    if (!this.isValidAccount(e.account, 6, 20)) {
      return ERR_CODE.RESTAURANT_INVALID_ACCOUNT;
    }
    if (!stringUtil.isValidString(e.password.trim(), 6, 20)) {
      return ERR_CODE.RESTAURANT_INVALID_PASSWORD;
    }
    if (!this.isValidRoleCode(e.roleCode)) {
      return ERR_CODE.RESTAURANT_INVALID_ROLE;
    }
    return ERR_CODE.OK
  }
  public isValidRestaurantWhenUpdate(e: any) {
    if (!e || !stringUtil.isValidString(e.name, 0)) {
      return ERR_CODE.RESTAURANT_INVALID_NAME;
    }
    if (!stringUtil.isValidString(e.address, 0, 255)) {
      return ERR_CODE.RESTAURANT_INVALID_ADDRESS;
    }
    if (!stringUtil.isValidString(e.description, 0, 3000)) {
      return ERR_CODE.RESTAURANT_INVALID_DESCRIPTION;
    }
    if (!this.isValidAccount(e.account, 6, 20)) {
      return ERR_CODE.RESTAURANT_INVALID_ACCOUNT;
    }
    if (!this.isValidRoleCode(e.roleCode)) {
      return ERR_CODE.RESTAURANT_INVALID_ROLE;
    }
    return ERR_CODE.OK
  }
}

export default ValidatorRestaurant.Instance