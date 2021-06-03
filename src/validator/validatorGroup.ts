import validator from "validator";
import ERR_CODE from "../const/error";
import stringUtil from "../util/stringUtil";
import numberUtil from "../util/numberUtil";
import dateUlti from "../util/dateUtil"

class ValidatorGroup {
  private static _instance: ValidatorGroup
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public isGroup(e: any) {

    // if (!numberUtil.isOnlyDigits(e.members)) {
    //   return ERR_CODE.GROUP_INVALID_MEMBERS;
    // }
    // if (!stringUtil.isValidString(e.name,0,255)){
    //   return ERR_CODE.GROUP_INVALID_NAME;
    // }
    return ERR_CODE.OK
  }
}

export default ValidatorGroup.Instance