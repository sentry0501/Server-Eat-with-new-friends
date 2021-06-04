import {CustomerEntity} from "../entity/customerEntity"
import { GroupEntity } from "../entity/groupEntity";
// import { OrderProductEntity } from "../entity/orderProductEntity";
export default interface IMessage {
  content: string
  date: Date
  customer: CustomerEntity
  group: GroupEntity
}