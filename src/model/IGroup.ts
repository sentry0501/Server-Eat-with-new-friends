import {CustomerEntity} from "../entity/customerEntity"
import { RestaurantEntity } from "../entity/restaurantEntity";
// import { OrderProductEntity } from "../entity/orderProductEntity";
export default interface IGroup {
  id: string
  name: string
  members: number
  leader: CustomerEntity
  restaurant: RestaurantEntity
  // orderProducts: OrderProductEntity[]
}