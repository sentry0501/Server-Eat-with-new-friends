import ERR_CODE from "../../const/error";
import { RestaurantEntity } from "../../entity/restaurantEntity";
import AbstractDTO from "../abstractDTO";
import RestaurantItemFindDTO from "./restaurantItemFindDTO";

export default class RestaurantsListFindDTO extends AbstractDTO{
  private restaurants: RestaurantItemFindDTO[]
  constructor(restaurants: RestaurantEntity[]) {
    super();
    this.restaurants = restaurants.map((e) => new RestaurantItemFindDTO(e));
  }
}