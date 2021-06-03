import { RestaurantEntity } from "../entity/restaurantEntity";

export default interface IProduct {
  id: string,
  name: string,
  restaurant: RestaurantEntity
  price: number,
  description: string,
  previewUri: string;
  isActive: boolean
}