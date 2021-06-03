import { CustomerEntity } from "../entity/customerEntity";
import { GroupEntity } from "../entity/groupEntity";
export default interface IGroupCustomer {
  group: GroupEntity
  customer: CustomerEntity
}