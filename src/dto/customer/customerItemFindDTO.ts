import serverConfig from "../../config/serverConfig";
import { CustomerEntity } from "../../entity/customerEntity";

export default class CustomerItemFindDTO{
  public id: string
  public name: string
  public address: string
  public avatarUri: string
  public isActive: boolean

  constructor(e: CustomerEntity) {
    this.id = e.id;
    this.name = e.name;
    this.address = e.address;
    this.avatarUri = serverConfig?.urlPrefixImg + e.avatarUri
    this.isActive = e.isActive;
  }
}