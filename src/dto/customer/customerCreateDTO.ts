import serverConfig from "../../config/serverConfig";
import { CustomerEntity } from "../../entity/customerEntity";
import AbstractDTO from "../abstractDTO";

export default class CustomerCreateDTO extends AbstractDTO{
  public id: string
  public name: string
  public birthday: Date
  public address: string
  public roleCode: number
  public avatarUri: string
  public isActive: boolean
  public account: string

  constructor(e: CustomerEntity) {
    super();

    this.id = e.id;
    this.name = e.name;
    this.birthday = e.birthday;
    this.address = e.address;
    this.roleCode = e.roleCode;
    this.avatarUri = serverConfig?.urlPrefixImg + e.avatarUri
    this.isActive = e.isActive;
    this.account = e.account;
  }
}