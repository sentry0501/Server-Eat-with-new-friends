import validator from "validator";
import ERR_CODE from "../const/error";
import stringUtil from "../util/stringUtil";
import numberUtil from "../util/numberUtil"
import dateUtil from "../util/dateUtil";

class ValidatorOrder {
  private static _instance: ValidatorOrder
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public isOrder(e: any) {
    // if (!numberUtil.isOnlyDigits(e.approve)) {
    //   return ERR_CODE.ORDER_INVALID_APPROVE;
    // }
    // if (!stringUtil.isValidString(e.note,0,3000)){
    //   return ERR_CODE.ORDER_INVALID_DESCRIPTION;
    // }
    if(!dateUtil.isValidDateTime(e.time)){
      return ERR_CODE.ORDER_INVALID_DATE;
    }
    return ERR_CODE.OK
  }
}

export default ValidatorOrder.Instance