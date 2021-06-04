import serverConfig from "../../config/serverConfig";
import ERR_CODE from "../../const/error";
import { PromotionEntity } from "../../entity/promotionEntity";
import AbstractDTO from "../abstractDTO";
import RestaurantItemFindDTO from "../restaurant/restaurantItemFindDTO";

export default class PromotionCreateDTO extends AbstractDTO{
  
  public id: string
  public name: string
  public restaurant: RestaurantItemFindDTO
  public description: string
  public previewUri: string
  public isActive: boolean

  constructor(e: PromotionEntity) {
    super();
    this.id = e.id;
    this.name = e.name;
    this.restaurant = new RestaurantItemFindDTO(e.restaurant);
    this.description = e.description;
    this.previewUri = serverConfig?.urlPrefixImg + e.previewUri
    this.isActive = e.isActive;
  }
}