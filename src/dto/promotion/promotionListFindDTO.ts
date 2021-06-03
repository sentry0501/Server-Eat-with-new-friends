import ERR_CODE from "../../const/error";
import { PromotionEntity } from "../../entity/promotionEntity";
import AbstractDTO from "../abstractDTO";
import PromotionItemFindDTO from "./promotionItemFindDTO";

export default class PromotionListFindDTO extends AbstractDTO{

  private promotions: PromotionItemFindDTO[]
  constructor(promotions: PromotionEntity[]) {
    super();
    this.promotions = promotions.map((e) => new PromotionItemFindDTO(e));
  }
}