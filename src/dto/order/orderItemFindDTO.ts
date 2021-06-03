import serverConfig from "../../config/serverConfig";
import { OrderEntity } from "../../entity/orderEntity";
import GroupJoinDTO from "../group/groupJoinDTO";

export default class OrderItemFindDTO{

  public id: string
  public time: Date
  // public group: GroupJoinDTO
  public note: string
  public approve: number

  constructor(e: OrderEntity) {
    this.id = e.id;
    this.time = e.time;
    // this.group = new GroupJoinDTO(e.group);
    this.note = e.note;
    this.approve = e.approve;
  }
}