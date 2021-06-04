import serverConfig from "../../config/serverConfig";
import ERR_CODE from "../../const/error";
import { ProductEntity } from "../../entity/productEntity";
import AbstractDTO from "../abstractDTO";
import RestaurantItemFindDTO from "../restaurant/restaurantItemFindDTO";

export default class ProductCreateDTO extends AbstractDTO{
  
  public id: string
  public name: string
  public price: number
  public restaurant: RestaurantItemFindDTO
  public description: string
  public previewUri: string
  public isActive: boolean

  constructor(e: ProductEntity) {
    super();
    this.id = e.id;
    this.name = e.name;
    this.restaurant = new RestaurantItemFindDTO(e.restaurant);
    this.price = e.price;
    this.description = e.description;
    this.previewUri = serverConfig?.urlPrefixImg + e.previewUri
    this.isActive = e.isActive;
  }
}