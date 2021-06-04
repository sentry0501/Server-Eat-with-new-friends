import ERR_CODE from "../../const/error";
import { MessageEntity } from "../../entity/messageEntity";
import AbstractDTO from "../abstractDTO";
import MessageItemFindDTO from "./messageItemFindDTO";

export default class MessageListFindDTO extends AbstractDTO{

  private messages: MessageItemFindDTO[]
  constructor(messages: MessageEntity[]) {
    super();
    this.messages = messages.map((e) => new MessageItemFindDTO(e));
  }
}