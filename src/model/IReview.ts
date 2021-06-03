import {CustomerEntity} from "../entity/customerEntity"
import { RestaurantEntity } from "../entity/restaurantEntity";
// import { OrderProductEntity } from "../entity/orderProductEntity";
export default interface IReview {
  content: string
  date: Date
  star: number
  customer: CustomerEntity
  restaurant: RestaurantEntity
  // orderProducts: OrderProductEntity[]
}