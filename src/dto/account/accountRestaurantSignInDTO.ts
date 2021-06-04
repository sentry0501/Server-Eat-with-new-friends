import serverConfig from "../../config/serverConfig";
import { RestaurantEntity } from "../../entity/restaurantEntity";
import AbstractDTO from "../abstractDTO";

export default class AccountRestaurantSignInDTO extends AbstractDTO {
  public token: string
  
  public id: string
  public name: string
  public description: string
  public address: string
  public avatarUri: string
  public coverUri: String
  public roleCode: number
  
  constructor(token: string, e: RestaurantEntity) {
    super()
    this.token = token;

    this.id = e.id;
    this.name = e.name;
    this.description = e.description;
    this.address = e.address;
    this.avatarUri = serverConfig?.urlPrefixImg + e.avatarUri;
    this.coverUri = serverConfig?.urlPrefixImg + e.coverUri;
    this.roleCode = e.roleCode;
  }
}