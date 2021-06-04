import serverConfig from "../../config/serverConfig";
import ERR_CODE from "../../const/error";
import { MessageEntity } from "../../entity/messageEntity";
import AbstractDTO from "../abstractDTO";
import CustomerItemFindDTO from "../customer/customerItemFindDTO";


export default class MessageCreateDTO extends AbstractDTO{
  
  public id: string
  public date: Date
  public customer: CustomerItemFindDTO
  public content: string


  constructor(e: MessageEntity) {
    super();
    this.id = e.id;
    this.date = e.date;
    this.customer = new CustomerItemFindDTO(e.customer);
    this.content = e.content;
  }
}