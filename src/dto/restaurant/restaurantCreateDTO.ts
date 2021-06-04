import serverConfig from "../../config/serverConfig";
import { RestaurantEntity } from "../../entity/restaurantEntity";
import AbstractDTO from "../abstractDTO";

export default class RestaurantCreateDTO extends AbstractDTO{
  public id: string
  public name: string
  public description: string
  public address: string
  public roleCode: number
  public avatarUri: string
  public coverUri: string
  public isActive: boolean
  public account: string

  constructor(e: RestaurantEntity) {
    super();

    this.id = e.id;
    this.name = e.name;
    this.description = e.description;
    this.address = e.address;
    this.roleCode = e.roleCode;
    this.avatarUri = serverConfig?.urlPrefixImg + e.avatarUri;
    this.coverUri = serverConfig?.urlPrefixImg + e.coverUri;
    this.isActive = e.isActive;
    this.account = e.account;
  }
}