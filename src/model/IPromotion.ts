import { RestaurantEntity } from "../entity/restaurantEntity";

export default interface IPromotion {
  id: string,
  name: string,
  restaurant: RestaurantEntity
  description: string,
  previewUri: string;
  isActive: boolean
}