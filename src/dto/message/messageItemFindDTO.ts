import serverConfig from "../../config/serverConfig";
import { MessageEntity } from "../../entity/messageEntity";
import CustomerItemFindDTO from "../customer/customerItemFindDTO";

export default class MessageItemFindDTO{

  public id: string
  public date: Date
  public content: string
  public customer: CustomerItemFindDTO

  constructor(e: MessageEntity) {
    this.id = e.id;
    this.date = e.date;
    this.content = e.content;
    this.customer = new CustomerItemFindDTO(e.customer);
  }
}