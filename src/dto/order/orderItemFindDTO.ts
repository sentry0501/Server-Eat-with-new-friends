import serverConfig from "../../config/serverConfig";
import { CustomerEntity } from "../../entity/customerEntity";
import { OrderEntity } from "../../entity/orderEntity";
import GroupJoinDTO from "../group/groupJoinDTO";

export default class OrderItemFindDTO{

  public id: string
  public time: Date
  // public group: GroupJoinDTO
  public note: string
  public approve: number
  public numbers: number
  public leader: string

  constructor(e: OrderEntity) {
    this.id = e.id;
    this.time = e.time;
    // this.group = new GroupJoinDTO(e.group);
    this.numbers = e.group.members;
    this.note = e.note;
    this.approve = e.approve;
    this.leader = e.group.leader.name;
  }
}