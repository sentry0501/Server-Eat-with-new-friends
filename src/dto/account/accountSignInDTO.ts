import serverConfig from "../../config/serverConfig";
import { CustomerEntity } from "../../entity/customerEntity";
import AbstractDTO from "../abstractDTO";

export default class AccountSignInDTO extends AbstractDTO {
  public token: string
  
  public id: string
  public name: string
  public birthday: Date
  public address: string
  public avatarUri: string
  public roleCode: number
  
  constructor(token: string, e: CustomerEntity) {
    super()
    this.token = token;

    this.id = e.id;
    this.name = e.name;
    this.birthday = e.birthday;
    this.address = e.address;
    this.avatarUri = serverConfig?.urlPrefixImg + e.avatarUri;
    this.roleCode = e.roleCode;
  }
}