import serverConfig from "../../config/serverConfig";
import ERR_CODE from "../../const/error";
import { OrderEntity } from "../../entity/orderEntity";
import AbstractDTO from "../abstractDTO";
import GroupJoinDTO from "../group/groupJoinDTO";

export default class OrderCreateDTO extends AbstractDTO{
  
  public id: string
  public time: Date
  public group: GroupJoinDTO
  public note: string
  public approve: number
  public restaurantId: string

  constructor(e: OrderEntity) {
    super();
    this.id = e.id;
    this.time = e.time;
    this.group = new GroupJoinDTO(e.group);
    this.note = e.note;
    this.approve = e.approve;
    this.restaurantId = e.restaurantId;
  }
}