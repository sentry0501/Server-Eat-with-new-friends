import serverConfig from "../../config/serverConfig";
import { RestaurantEntity } from "../../entity/restaurantEntity";

export default class RestaurantItemFindDTO{
  public id: string
  public name: string
  public description: string
  public address: string
  public avatarUri: string
  public coverUri: string
  public isActive: boolean

  constructor(e: RestaurantEntity) {
    this.id = e.id;
    this.name = e.name;
    this.address = e.address;
    this.description = e.description;
    this.avatarUri = serverConfig?.urlPrefixImg + e.avatarUri;
    this.coverUri = serverConfig?.urlPrefixImg + e.coverUri;
    this.isActive = e.isActive;
  }
}