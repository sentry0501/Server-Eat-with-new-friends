import { GroupEntity } from "../entity/groupEntity";

export default interface IOrder {
  id: string,
  time: Date,
  group: GroupEntity
  note: string,
  approve: number,
  restaurantId: string,
}