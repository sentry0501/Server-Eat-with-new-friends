import serverConfig from "../../config/serverConfig";
import { PromotionEntity } from "../../entity/promotionEntity";

export default class PromotionItemFindDTO{

  public id: string
  public name: string
  public description: string
  public previewUri: string
  public isActive: boolean

  constructor(e: PromotionEntity) {
    this.id = e.id;
    this.name = e.name;
    this.description = e.description;
    this.previewUri = serverConfig?.urlPrefix + e.previewUri
    this.isActive = e.isActive;
  }
}