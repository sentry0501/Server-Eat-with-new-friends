import ERR_CODE from "../../const/error";
import { GroupEntity } from "../../entity/groupEntity";
import AbstractDTO from "../abstractDTO";
import GroupItemFindDTO from "./groupItemFindDTO";
import GroupJoinDTO from "./groupJoinDTO";

export default class GroupListFindDTO extends AbstractDTO{

  private groups: GroupJoinDTO[]
  constructor(groups: GroupEntity[]) {
    super();
    this.groups = groups.map((e) => new GroupJoinDTO(e));
  }
}