import validator from "validator";
import ERR_CODE from "../const/error";
import stringUtil from "../util/stringUtil";
import numberUtil from "../util/numberUtil"

class ValidatorPromotion {
  private static _instance: ValidatorPromotion
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public isPromotion(e: any) {
    if (!stringUtil.isValidString(e.name, 0)) {
      return ERR_CODE.PROMOTION_INVALID_NAME;
    }
    if (!stringUtil.isValidString(e.description,0,3000)){
      return ERR_CODE.PROMOTION_INVALID_DESCRIPTION;
    }
    return ERR_CODE.OK
  }
}

export default ValidatorPromotion.Instance